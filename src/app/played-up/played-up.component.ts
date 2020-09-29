import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {Observable} from "rxjs";
import {Player} from "../models/player";
import {selectAllPlayers} from "../team/team.selectors";
import {loadAllPlayedUpPlayers} from "../team/team.actions";
import {selectCurrentSeasonId} from "../season/season.selectors";
import {MatBottomSheet} from "@angular/material";
import {PlayedUpBottomsheetComponent} from "../played-up-bottomsheet/played-up-bottomsheet.component";

@Component({
  selector: 'app-played-up',
  templateUrl: './played-up.component.html',
  styleUrls: ['./played-up.component.scss']
})
export class PlayedUpComponent implements OnInit {
  players$: Observable<Player[]>;
  columnsToDisplay = ['name', 'teamName', 'playedUpCount', 'info'];
  constructor(
    private store: Store<AppState>,
    public bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
    this.store
      .pipe(
        select(selectCurrentSeasonId)
      ).subscribe(seasonId => {
        this.store.dispatch(loadAllPlayedUpPlayers({seasonId}));
        this.players$ = this.store.pipe(
          select(selectAllPlayers)
        );
    });
  }

  showDates(player: Player) {
    const bottomSheetRef = this.bottomSheet.open(PlayedUpBottomsheetComponent, {
      data: {player},
      panelClass: 'bg-semi-dark'
    });
  }

}
