import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {DivisionService} from "../division.service";
import {selectCurrentSeasonId} from "../season/season.selector";
import {loadDivisionsWithTeams} from "../division/division.actions";
import {Division} from "../models/division";
import {selectAllDivisions} from "../division/division.selector";

@Component({
  selector: 'app-team-listing',
  templateUrl: './team-listing.component.html',
  styleUrls: ['./team-listing.component.scss']
})
export class TeamListingComponent implements OnInit {
  divisionsWithTeams$: Observable<Division[]>;
  divisions$: Observable<Division[]>;
  constructor(
    private store: Store<AppState>,
    private divisionService: DivisionService
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
