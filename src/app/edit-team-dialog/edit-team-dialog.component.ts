import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {TeamService} from "../team.service";
import {Team} from "../models/team";
import {selectTeamById} from "../team/team.selectors";
import {updateTeam} from "../team/team.actions";
import {Update} from "@ngrx/entity";
import {Moment} from "moment";

@Component({
  selector: 'app-edit-team-dialog',
  templateUrl: './edit-team-dialog.component.html',
  styleUrls: ['./edit-team-dialog.component.scss']
})
export class EditTeamDialogComponent implements OnInit {
  editTeamForm: FormGroup;
  team: Team;
  teamId: number;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private teamService: TeamService,
    public dialogRef: MatDialogRef<EditTeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.teamId = data.id;
  }

  ngOnInit() {
    this.store.pipe(
      select(selectTeamById(this.teamId))
    ).subscribe(team => this.team = team);
    this.editTeamForm = this.fb.group({
      name: [this.team.name, Validators.required],
      narrative: [this.team.narrative, Validators.required],
      primary_colour: [this.team.primaryColour],
      secondary_colour: [this.team.secondaryColour],
      tertiary_colour: [this.team.tertiaryColour]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  save() {
    if (this.editTeamForm.valid) {
      const changes = this.editTeamForm.value;
      this.teamService.updateTeam(changes, this.teamId)
        .subscribe(update => {
            const updatedTeam: Update<Team> = {
              id: this.teamId,
              changes
            };
            this.store.dispatch(updateTeam({team: updatedTeam}));
            window.location.reload();
          }
        );
    }
  }

}
