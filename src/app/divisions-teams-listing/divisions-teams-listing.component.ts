import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {selectCurrentSeasonId} from "../season/season.selectors";
import {loadDivisionsWithTeams} from "../division/division.actions";
import {Division} from "../models/division";
import {selectAllDivisions} from "../division/division.selectors";
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
            select(selectAllDivisions)
          );
    });

  //   const toGroups = this.divisionsWithTeams$.pipe(
  //     map(division => {
  //       return new FormGroup({
  //         name: new FormControl(division.name, Validators.required)
  //       });
  //     })
  //   );
  //   this.controls = new FormArray(toGroups);
  // }
  //
  // getControl(index: number, field: string) {
  //   return this.controls.at(index).get(field);
  // }



  }

  editName(index: number) {

  }
}
