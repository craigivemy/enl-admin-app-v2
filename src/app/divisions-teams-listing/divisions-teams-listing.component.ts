import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {selectCurrentSeasonId} from "../season/season.selector";
import {loadDivisionsWithTeams} from "../division/division.actions";
import {Division} from "../models/division";
import {selectAllDivisions} from "../division/division.selector";

@Component({
  selector: 'app-team-listing',
  templateUrl: './divisions-teams-listing.component.html',
  styleUrls: ['./divisions-teams-listing.component.scss']
})
export class DivisionsTeamsListingComponent implements OnInit {
  divisionsWithTeams$: Observable<Division[]>;
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.store
      .pipe(
        select(selectCurrentSeasonId)
      ).subscribe(seasonId => {
          this.store.dispatch(loadDivisionsWithTeams({seasonId}));
          this.divisionsWithTeams$ = this.store.pipe(
            select(selectAllDivisions)
          );
    });
  }
}
