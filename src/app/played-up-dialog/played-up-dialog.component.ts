import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatChipInputEvent, MatDialogRef} from "@angular/material";
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {TeamService} from "../team.service";
import {Player} from "../models/player";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {addPlayedUp, updatePlayer} from "../team/team.actions";
import {selectCurrentSeasonId} from "../season/season.selectors";
import {PlayedUp} from "../models/playedUp";
import {Update} from "@ngrx/entity";

@Component({
  selector: 'app-played-up-dialog',
  templateUrl: './played-up-dialog.component.html',
  styleUrls: ['./played-up-dialog.component.scss']
})
export class PlayedUpDialogComponent implements OnInit {
  player: Player;
  form: FormGroup;
  forename;
  seasonId: number;
  playedUpDatesInput: FormGroup;
  test;
  constructor(
    private store: Store<AppState>,
    private teamService: TeamService,
    public dialogRef: MatDialogRef<PlayedUpDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.forename = data.player.forename;
    this.player = data.player;
  }

  ngOnInit() {
    this.form = new FormGroup({
      playedUps: new FormControl(this.player.playedUps)

    });
    this.store.pipe(select(selectCurrentSeasonId)).subscribe(seasonId => this.seasonId = seasonId);
  }
  addPlayedUpDate(value) {
    this.teamService.addPlayedUp(value, this.player.id, this.seasonId).subscribe(
      (player) => {
        const updatedPlayer: Update<Player> = {
          id: player.id,
          changes: player
        };
        this.store.dispatch(updatePlayer({player: updatedPlayer}));
      }
    );
  }
  get playedUps() {
    return this.form.get('playedUps');
  }


  onCancel(): void {
    //
  }

  save() {
   // console.log(this.copyOfPlayedUpData);
  }

}
