import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {TeamService} from "../team.service";
import {MatDialogRef} from "@angular/material";
import {Team} from "../models/team";
import {addTeam} from "../team/team.actions";
import {MessengerService} from "../messenger.service";

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
    private teamService: TeamService,
    private messengerService: MessengerService,
    public dialogRef: MatDialogRef<TeamDialogComponent>
  ) {
    this.addTeamForm = this.fb.group({
      name: ['', Validators.required],
      narrative: [''],
      primaryColour: [''],
      secondaryColour: [''],
      tertiaryColour: ['']
    });
  }

  ngOnInit() {
    this.addTeamForm.valueChanges.subscribe(
      val => console.log(val)
    );
  }

  saveTeam() {
    if (this.addTeamForm.valid) {
      const team: Team = this.addTeamForm.value;
      this.teamService.addTeam(team).subscribe(
        newTeam => {
          this.store.dispatch(addTeam({team: newTeam}));
          this.dialogRef.close();
          this.messengerService.sendMessage('Team Added', 1000);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close({updated: false});
  }

  get teamName() {
    return this.addTeamForm.get('name').value;
  }
  get primaryColour() {
     return this.addTeamForm.get('primaryColour').value;
  }

}
