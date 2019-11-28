import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {Observable} from 'rxjs';
import {Fixture} from '../models/fixture';
import {selectCurrentSeasonId} from '../season/season.selectors';
import {loadFixtures} from '../fixture/fixture.actions';
import {selectAllFixtures} from '../fixture/fixture.selectors';
import {filter, groupBy, map, mergeMap, skipWhile, take, tap, toArray} from 'rxjs/operators';
import {FixtureService} from '../fixture.service';
import {DivisionService} from '../division.service';
import {Division} from '../models/division';

@Component({
  selector: 'app-fixture-listing',
  templateUrl: './fixture-listing.component.html',
  styleUrls: ['./fixture-listing.component.scss']
})
export class FixtureListingComponent implements OnInit {
  fixtures$;
  activeDivisions: Observable<Division[]>;
  constructor(
    private store: Store<AppState>,
    private fixtureService: FixtureService,
    private divisionService: DivisionService
  ) { }

  ngOnInit() {
this.store.pipe(
  select(selectCurrentSeasonId)
).subscribe(seasonId =>  {
      this.store.dispatch(loadFixtures({seasonId}));
      // todo IMPORTANT - have these in store
      this.activeDivisions = this.divisionService.getActiveDivisions(seasonId);
      this.fixtures$ = this.store.pipe(
        select(selectAllFixtures),
        filter(arr => arr.length > 0),
        take(1),
        mergeMap(fixtures => fixtures),
        groupBy(fixture => fixture.matchDate),
        mergeMap(group => group.pipe(toArray())),
        toArray()
      );
    });
  }


}
