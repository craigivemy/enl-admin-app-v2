import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Division} from '../models/division';
import {DivisionService} from '../division.service';
import {Team} from '../models/team';
import {TeamService} from '../team.service';

@Component({
  selector: 'app-new-season',
  templateUrl: './new-season.component.html',
  styleUrls: ['./new-season.component.scss']
})
export class NewSeasonComponent implements OnInit {
  divisions: Observable<Division[]>;
  teams: Observable<Team[]>;
  dynamicDivisionSteps: Division[] = [];
  teamsInDivisions = {}; // todo - need to use store
  basicDetailsForm = this.fb.group({
    name: ['', Validators.required],
    startDate: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private divisionService: DivisionService,
    private teamService: TeamService) { }

  ngOnInit() {
    this.divisions = this.divisionService.getDivisions();
    this.teams = this.teamService.getTeams();
  }

  updateDynamicDivisionSteps(event: any, division: Division) {
    if (event.checked) {
      this.dynamicDivisionSteps.push(division);
      this.teamsInDivisions[division.id] = [];
    } else {
      this.removeDivisionStep(division);
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

  isTeamInThisDivision(teamId: number, divisionId: number): boolean {
    return this.teamsInDivisions[divisionId] && this.teamsInDivisions[divisionId].indexOf(teamId) !== -1; // is in division
  }

  test(): void {
    console.log(this.teamsInDivisions);
  }

}
