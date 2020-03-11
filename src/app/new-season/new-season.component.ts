import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Division} from '../models/division';
import {DivisionService} from '../division.service';
import {Team} from '../models/team';
import {TeamService} from '../team.service';
import * as moment from 'moment';
import {Season} from "../models/season";
import {SeasonService} from "../season.service";
import {Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {addSeason} from "../season/season.actions";
import {Setting} from '../models/setting';
import {SettingService} from '../setting.service';

@Component({
  selector: 'app-new-season',
  templateUrl: './new-season.component.html',
  styleUrls: ['./new-season.component.scss']
})
export class NewSeasonComponent implements OnInit {
  divisions: Observable<Division[]>;
  settings: Setting[];
  teams: Team[];
  dynamicDivisionSteps: Division[] = [];
  teamsInDivisions = {};
  basicDetailsForm = this.fb.group({
    name: ['', Validators.required],
    startDate: ['', Validators.required],
    rounds: [2, Validators.required]
  });
  scoringDetailsForm = this.fb.group({
    //name: [this.settings.]
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private divisionService: DivisionService,
    private settingService: SettingService,
    private teamService: TeamService,
    private seasonService: SeasonService) { }

  ngOnInit() {
    this.divisions = this.divisionService.getDivisions();
    this.settingService.getSettings().subscribe(settings => this.settings = settings);
    this.teamService.getTeams().subscribe(teams => this.teams = teams);
  }

  updateDynamicDivisionSteps(event: any, division: Division) {
    if (event.checked) {
      this.dynamicDivisionSteps.push(division);
      this.teamsInDivisions[division.id] = [];
    } else {
      this.removeDivisionStep(division);
      for (const team of this.teamsInDivisions[division.id]) {
        team.addedToSeason = null;
      }
      delete this.teamsInDivisions[division.id];
    }
  }
  removeDivisionStep(division: Division) {
    for (let i = 0; i < this.dynamicDivisionSteps.length; i++) {
      if (division.id === this.dynamicDivisionSteps[i].id) {
        this.dynamicDivisionSteps.splice(i);
      }
    }
  }

  updateTeamsInDivisions(event: any, i: number, divisionId: number, team: Team): void {
    if (event.checked) {
      this.teamsInDivisions[divisionId].push(team);
      team.addedToSeason = divisionId;
    } else {
      this.removeTeamFromDivision(i, divisionId);
      team.addedToSeason = null;
    }
  }

  removeTeamFromDivision(i: number, divisionId: number): void {
    for (let k = 0; k < this.teamsInDivisions[divisionId].length; k++) {
      this.teamsInDivisions[divisionId].splice(k, 1);
    }
  }

  save(status: number) {
    const startDate = moment(this.basicDetailsForm.controls.startDate.value).format('YYYY-MM-DD');
    const newSeason: Season = {
      name: this.basicDetailsForm.controls.name.value,
      startDate,
      rounds: this.basicDetailsForm.controls.rounds.value,
      current: status,
    };
    const divisionsTeams = this.teamsInDivisions;
    console.log(this.teamsInDivisions);
    this.seasonService.save(newSeason, divisionsTeams).subscribe(
      season => this.store.dispatch(addSeason({season}))
    );
  }

}
