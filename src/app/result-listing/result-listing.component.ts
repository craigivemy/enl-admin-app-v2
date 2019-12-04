import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {selectCurrentSeasonId} from '../season/season.selectors';
import {loadFixtures} from '../fixture/fixture.actions';
import {selectAllFixtures, selectWeeksFromFixtures} from '../fixture/fixture.selectors';
import {distinct, filter, flatMap, groupBy, mergeMap, skipWhile, take, tap, toArray} from 'rxjs/operators';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import {Division} from '../models/division';
import {DivisionService} from '../division.service';
import {loadActiveDivisions} from '../division/division.actions';
import {FormControl} from '@angular/forms';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-result-listing',
  templateUrl: './result-listing.component.html',
  styleUrls: ['./result-listing.component.scss']
})
export class ResultListingComponent implements OnInit {
  fixtures$;
  fixturesWeeks$;
  columnsToDisplay = ['matchDate', 'homeTeamName', 'homeTeamScore', 'awayTeamScore', 'awayTeamName'];
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
        select(selectWeeksFromFixtures)
      );
      this.store.pipe(select(selectAllFixtures)).subscribe(fixtures => this.dataSource = new MatTableDataSource(fixtures));
    });

    this.selectedWeek.valueChanges.subscribe(
      week => {
        console.log(moment(week).format('yyyy'));
        //this.dataSource.filter = moment(week).calendar();
      }
    );

  }
}
/*
this.fixturesWeeks$ = this.store.pipe(
  // todo - alter divisionstate to divisionsAnd Teams state and add active divisions state?
  // todo - or just sack state and use service?
  // combineLatest etc?
  select(selectWeeksFromFixtures),
  //mergeMap(fixtures => fixtures),
  tap(vals => console.log(vals))
  // list out tabs, load based on id and click?
  // load list of weeks - this means each week only have to click through to one page?
  // or weeks as above but still with tabs?
  // filter(arr => arr.length > 0),
  // take(1),
  // mergeMap(fixtures => fixtures),
  // groupBy(fixture => moment(fixture.matchDate).format('YYYY-MM-DD')),
  // mergeMap(group => group.pipe(toArray())),
  // toArray()
);
*/
