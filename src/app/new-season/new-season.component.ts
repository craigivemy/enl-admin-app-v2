import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Division} from '../models/division';
import {DivisionService} from '../division.service';
import {Team} from '../models/team';
import {TeamService} from '../team.service';
import * as moment from 'moment';
import {Season} from "../models/season";
import {SeasonService} from "../season.service";
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {addSeason} from "../season/season.actions";
import {SettingService} from '../setting.service';
import {map, skipWhile, tap} from 'rxjs/operators';
import {fixtureTimes} from "../../data/fixture-times";
import {selectCurrentSeasonId} from "../season/season.selectors";
import {loadTeams} from "../team/team.actions";
import {selectOnlyNonDeletedTeams} from "../team/team.selectors";

@Component({
  selector: 'app-new-season',
  templateUrl: './new-season.component.html',
  styleUrls: ['./new-season.component.scss']
})
export class NewSeasonComponent implements OnInit {
  divisions: Observable<Division[]>;
  teams: Team[];
  dynamicDivisionSteps: Division[] = [];
  teamsInDivisions = {};
  fixtureTimes = fixtureTimes;

  basicDetailsForm = this.fb.group({
    name: ['', Validators.required],
    startDate: ['', Validators.required],
    rounds: [2, Validators.required],
    number_of_courts: [4, Validators.required],
    match_times: [
      ['14:30', '12:30', '10:30']
    ]
  });
  scoringDetailsForm = this.fb.group({
    win_value: [3],
    draw_value: [1],
    loss_value: [0],
    bonus_point_within_5_value: [0],
    bonus_point_over_50_percent_value: [0],
    walkover_awarded_points: [0],
    walkover_deducted_points: [0],
    walkover_awarded_goals: [0],
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
    this.settingService.getSettings().pipe(
      tap(settings => console.log(settings)),
      map(settings => {
        settings.map(setting => {
          if (setting.name === 'win_value') {
            this.scoringDetailsForm.patchValue({win_value: setting.settingValue});
          } else if (setting.name === 'draw_value') {
            this.scoringDetailsForm.patchValue({draw_value: setting.settingValue});
          } else if (setting.name === 'loss_value') {
            this.scoringDetailsForm.patchValue({loss_value: setting.settingValue});
          } else if (setting.name === 'bonus_point_within_5_value') {
            this.scoringDetailsForm.patchValue({bonus_point_within_5_value: setting.settingValue});
          } else if (setting.name === 'bonus_point_over_50_percent_value') {
            this.scoringDetailsForm.patchValue({bonus_point_over_50_percent_value: setting.settingValue});
          } else if (setting.name === 'walkover_awarded_points') {
            this.scoringDetailsForm.patchValue({walkover_awarded_points: setting.settingValue});
          } else if (setting.name === 'walkover_deducted_points') {
            this.scoringDetailsForm.patchValue({walkover_deducted_points: setting.settingValue});
          } else if (setting.name === 'walkover_awarded_goals') {
            this.scoringDetailsForm.patchValue({walkover_awarded_goals: setting.settingValue});
          } else if (setting.name === 'number_of_courts') {
            this.basicDetailsForm.patchValue({number_of_courts: setting.settingValue});
          } else if (setting.name === 'match_times') {
            this.basicDetailsForm.patchValue({match_times: JSON.parse(setting.settingValue)});
          }
        });
      })
    ).subscribe();
    this.store.pipe(
      select(selectCurrentSeasonId),
      skipWhile(seasonId => seasonId < 0)
    )
      .subscribe(seasonId => {
      this.teamService.getTeams(seasonId).subscribe(teams => {
        this.teams = teams.filter(team => !team.deletedAt);
      });
    });
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

    const moreBasicDetails = {
      number_of_courts: this.basicDetailsForm.controls.number_of_courts.value,
      match_times: JSON.stringify(this.basicDetailsForm.controls.match_times.value)
    };

    this.seasonService.save(newSeason, divisionsTeams, moreBasicDetails, this.scoringDetailsForm.value).subscribe(
      season => this.store.dispatch(addSeason({season}))
    );
  }

}
