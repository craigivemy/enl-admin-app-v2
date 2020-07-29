import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {Observable} from "rxjs";
import {Player} from "../models/player";
import {selectPlayers} from "../team/team.selectors";
import {loadAllPlayedUpPlayers} from "../team/team.actions";
import {selectCurrentSeasonId} from "../season/season.selectors";

@Component({
  selector: 'app-played-up',
  templateUrl: './played-up.component.html',
  styleUrls: ['./played-up.component.scss']
})
export class PlayedUpComponent implements OnInit {
  players$: Observable<Player[]>;
  columnsToDisplay = ['name', 'teamName', 'playedUpCount'];
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store
      .pipe(
        select(selectCurrentSeasonId)
      ).subscribe(seasonId => {
        this.store.dispatch(loadAllPlayedUpPlayers({seasonId}));
        this.players$ = this.store.pipe(
          select(selectPlayers)
        );
    });
  }

}
