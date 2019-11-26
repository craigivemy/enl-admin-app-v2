import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {Observable} from 'rxjs';
import {Fixture} from '../models/fixture';
import {selectCurrentSeasonId} from '../season/season.selectors';
import {loadFixtures} from '../fixture/fixture.actions';
import {selectAllFixtures} from '../fixture/fixture.selectors';
import {groupBy, map, mergeMap, tap, toArray} from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-fixture-listing',
  templateUrl: './fixture-listing.component.html',
  styleUrls: ['./fixture-listing.component.scss']
})
export class FixtureListingComponent implements OnInit {
  fixtures$;
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
        groupBy(fixtures => fixtures.map(fixture => moment(fixture.matchDate).format('m'))),
        tap(res => console.log(res)),
        mergeMap(group => group.pipe(toArray()))
      );
    });
  }

}
