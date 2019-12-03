import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {selectCurrentSeasonId} from '../season/season.selectors';
import {loadFixtures} from '../fixture/fixture.actions';
import {selectAllFixtures, selectWeeksFromFixtures} from '../fixture/fixture.selectors';
import {distinct, filter, flatMap, groupBy, mergeMap, take, tap, toArray} from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-result-listing',
  templateUrl: './result-listing.component.html',
  styleUrls: ['./result-listing.component.scss']
})
export class ResultListingComponent implements OnInit {
  fixtures$;
  columnsToDisplay = ['homeTeamName', 'homeTeamScore', 'awayTeamScore', 'awayTeamName'];
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.pipe(
      select(selectCurrentSeasonId)
    ).subscribe(seasonId =>  {
      this.store.dispatch(loadFixtures({seasonId}));
      this.fixtures$ = this.store.pipe(
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
    });
  }

  save(row: any) {
    console.log(row);
  }
}
