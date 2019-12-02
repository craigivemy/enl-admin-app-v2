import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {selectCurrentSeasonId} from '../season/season.selectors';
import {loadFixtures} from '../fixture/fixture.actions';
import {selectAllFixtures} from '../fixture/fixture.selectors';
import {filter, groupBy, mergeMap, take, toArray} from 'rxjs/operators';
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
