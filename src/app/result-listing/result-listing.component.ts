import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {selectCurrentSeasonId} from '../season/season.selectors';
import {loadFixtures} from '../fixture/fixture.actions';
import {selectAllFixtures, selectWeeksFromFixtures} from '../fixture/fixture.selectors';
import {
  distinct,
  filter,
  flatMap,
  groupBy,
  mergeMap,
  skipWhile,
  take,
  tap,
  toArray,
  withLatestFrom
} from 'rxjs/operators';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import {Division} from '../models/division';
import {DivisionService} from '../division.service';
import {FormControl} from '@angular/forms';
import {MatTableDataSource} from '@angular/material';

moment.locale('en-gb');

@Component({
  selector: 'app-result-listing',
  templateUrl: './result-listing.component.html',
  styleUrls: ['./result-listing.component.scss']
})
export class ResultListingComponent implements OnInit {
  fixturesWeeks$;
  columnsToDisplay = ['homeTeamName', 'homeTeamScore', 'awayTeamScore', 'awayTeamName'];
  activeDivisions$: Observable<Division[]>;
  selectedWeek = new FormControl('');
  dataSource;
  constructor(
    private store: Store<AppState>,
    private divisionService: DivisionService
  ) { }

  ngOnInit() {
    this.store.pipe(
      select(selectCurrentSeasonId),
      filter(seasonId => seasonId > 0),
      tap(val => console.log(val)),
    ).subscribe(seasonId =>  {
      this.store.dispatch(loadFixtures({seasonId}));
      this.activeDivisions$ = this.divisionService.getActiveDivisions(seasonId);
      this.fixturesWeeks$ = this.store.pipe(
        select(selectWeeksFromFixtures),
        tap(val => console.log(val))
      );
      this.store.pipe(select(selectAllFixtures), tap(fix => console.log(fix))).subscribe(fixtures => this.dataSource = new MatTableDataSource(fixtures));
    });

    this.selectedWeek.valueChanges.subscribe(
      week => {
        this.dataSource.filter = moment(week).format('YYYY-MM-DD');
      }
    );

  }
}
