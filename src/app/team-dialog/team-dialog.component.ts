import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {TeamService} from "../team.service";

@Component({
  selector: 'app-team-dialog',
  templateUrl: './team-dialog.component.html',
  styleUrls: ['./team-dialog.component.scss']
})
export class TeamDialogComponent implements OnInit {
  addTeamForm: FormGroup;
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private teamService: TeamService
  ) {
    this.addTeamForm = this.fb.group({
      teamName: ['', Validators.required],
      teamNarrative: ['', Validators.required],
      primaryColour: ['']
    });
  }

  ngOnInit() {
    this.addTeamForm.valueChanges.subscribe(
      val => console.log(val)
    );
  }

  saveTeam() {
    if (this.addTeamForm.valid) {

    }
  }

  get teamName() {
    return this.addTeamForm.get('teamName').value;
  }

}
