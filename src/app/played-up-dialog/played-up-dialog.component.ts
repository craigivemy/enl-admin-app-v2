import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatChipInputEvent, MatDialogRef} from "@angular/material";
import {Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {TeamService} from "../team.service";
import {Player} from "../models/player";
import {FormBuilder, FormGroup} from "@angular/forms";
import * as moment from 'moment';

@Component({
  selector: 'app-played-up-dialog',
  templateUrl: './played-up-dialog.component.html',
  styleUrls: ['./played-up-dialog.component.scss']
})
export class PlayedUpDialogComponent implements OnInit {
  player: Player;
  copyOfPlayedUpData;
  playedUpData = [];
  forename;
  playedUpDatesInput: FormGroup;
  constructor(
    private store: Store<AppState>,
    private teamService: TeamService,
    public dialogRef: MatDialogRef<PlayedUpDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.forename = data.player.forename;
    this.playedUpData = data.player.playedUps;
    this.copyOfPlayedUpData = [...this.playedUpData];
    // todo - https://ngrx.io/guide/data/entity-change-tracker
    // this.playedUpDatesInput = this.fb.group({
    //   // should this be formArray?
    //   pp: [this.copyOfPlayedUpData]
    // });

  }

  ngOnInit() {
  }

  removePlayedUp(id) {
    const index = this.copyOfPlayedUpData.findIndex(pu => pu.id === id);
    this.copyOfPlayedUpData.splice(index);
  }

  addPlayedUpDate(event: MatChipInputEvent) {
    this.copyOfPlayedUpData.push({id: 23});
  }

  onCancel(): void {
    //
  }

  save() {
    console.log(this.copyOfPlayedUpData);
  }

}
