import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {selectCurrentSeasonId} from "../season/season.selectors";
import {loadDivisionsWithTeams} from "../division/division.actions";
import {Division} from "../models/division";
import {selectAllDivisionsWithTeams} from "../division/division.selectors";
import {map} from 'rxjs/operators';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-team-listing',
  templateUrl: './divisions-teams-listing.component.html',
  styleUrls: ['./divisions-teams-listing.component.scss']
})
export class DivisionsTeamsListingComponent implements OnInit {
  divisionsWithTeams$: Observable<Division[]>;
  columnsToDisplay = ['teamName'];
  controls: FormArray;
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
            select(selectAllDivisionsWithTeams)
          );
    });
  }
}
