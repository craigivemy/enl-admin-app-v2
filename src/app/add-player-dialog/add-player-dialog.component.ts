import {Component, Inject, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Team} from "../models/team";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TeamService} from "../team.service";
import {selectCurrentSeasonId} from "../season/season.selectors";
import {Update} from "@ngrx/entity";
import {updateTeam} from "../team/team.actions";
import {MessengerService} from "../messenger.service";

@Component({
  selector: 'app-add-player-dialog',
  templateUrl: './add-player-dialog.component.html',
  styleUrls: ['./add-player-dialog.component.scss']
})
export class AddPlayerDialogComponent implements OnInit {
  team: Team;
  seasonId: number;
  players = new FormArray([
    new FormGroup({
      forename: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required)
    })
  ]);
  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<AddPlayerDialogComponent>,
    private fb: FormBuilder,
    private teamService: TeamService,
    private messengerService: MessengerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.team = this.data.team;
  }

  addPlayerGroup() {
    if (this.players.valid) {
      const group = new FormGroup({
        forename: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required)
      });
      this.players.push(group);
    }
  }
  removePlayerGroup(index: number) {
    this.players.removeAt(index);
  }

  save() {
    if (this.players.valid) {
      this.teamService.addPlayersToTeam(this.team.id, this.players.value, this.seasonId)
        .subscribe(updates => {
            const updatedTeam: Update<Team> = {
              id: this.team.id,
              changes: updates
            };
            this.store.dispatch(updateTeam({team: updatedTeam}));
            this.messengerService.sendMessage('Player(s) Added');
            this.dialogRef.close();
          },
          err => {
            this.messengerService.sendMessage('Oops! Something went wrong, please try again', 500, 5000);
            this.dialogRef.close();
          }
        );
    }
  }

  ngOnInit() {
    this.store.pipe(
      select(selectCurrentSeasonId)
    ).subscribe(seasonId => this.seasonId = seasonId);
  }

}
