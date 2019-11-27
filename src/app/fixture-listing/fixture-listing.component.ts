import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {Observable} from 'rxjs';
import {Fixture} from '../models/fixture';
import {selectCurrentSeasonId} from '../season/season.selectors';
import {loadFixtures} from '../fixture/fixture.actions';
import {selectAllFixtures} from '../fixture/fixture.selectors';
import {groupBy, map, mergeMap, skipWhile, tap, toArray} from 'rxjs/operators';
import {FixtureService} from '../fixture.service';

@Component({
  selector: 'app-fixture-listing',
  templateUrl: './fixture-listing.component.html',
  styleUrls: ['./fixture-listing.component.scss']
})
export class FixtureListingComponent implements OnInit {
  fixtures$;
  constructor(
    private store: Store<AppState>,
    private fixtureService: FixtureService
  ) { }

  ngOnInit() {
this.store.pipe(
  select(selectCurrentSeasonId)
).subscribe(seasonId =>  {
  // this.fixtureService.getFixtures(seasonId).pipe(
  //   mergeMap(fixtures => fixtures),
  //   groupBy(fixture => fixture.matchDate),
  //   mergeMap(group => group.pipe(toArray())),
  //   tap(res => console.log(res))
  // ).subscribe(fixtures => this.fixtures$ = fixtures);
      this.store.dispatch(loadFixtures({seasonId}));
      this.store.pipe(
        select(selectAllFixtures),
        mergeMap(fixtures => fixtures),
        groupBy(fixture => fixture.matchDate),
        tap(res => console.log(res)),
        mergeMap(group => group.pipe(toArray())),
        tap(res => console.log(res))
      ).subscribe(fixtures => this.fixtures$ = fixtures);
    });
  }


}
