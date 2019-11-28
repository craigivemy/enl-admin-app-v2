import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {Observable} from 'rxjs';
import {Fixture} from '../models/fixture';
import {selectCurrentSeasonId} from '../season/season.selectors';
import {loadFixtures} from '../fixture/fixture.actions';
import {selectAllFixtures, selectFixturesByDivisions} from '../fixture/fixture.selectors';
import {filter, first, groupBy, map, mergeMap, skipWhile, take, tap, toArray} from 'rxjs/operators';
import {FixtureService} from '../fixture.service';
import {DivisionService} from '../division.service';
import {Division} from '../models/division';
import * as moment from 'moment';

@Component({
  selector: 'app-fixture-listing',
  templateUrl: './fixture-listing.component.html',
  styleUrls: ['./fixture-listing.component.scss']
})
export class FixtureListingComponent implements OnInit {
  fixtures$;
  columnsToDisplay = ['homeTeamName', 'awayTeamName', 'division'];
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
this.store.pipe(
  select(selectCurrentSeasonId)
).subscribe(seasonId =>  {
      this.store.dispatch(loadFixtures({seasonId}));
      this.fixtures$ = this.store.pipe(
        select(selectAllFixtures),
        filter(arr => arr.length > 0),
        take(1),
        mergeMap(fixtures => fixtures),
        groupBy(fixture => moment(fixture.matchDate).format('YYYY-MM-DD')),
        mergeMap(group => group.pipe(toArray())),
        toArray()
      );
    });
  }
}
