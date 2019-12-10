import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {selectCurrentSeasonId} from '../season/season.selectors';
import {loadMatches} from '../match/match.actions';
import {selectAllMatches} from '../match/match.selectors';
import {filter, groupBy, mergeMap, take, toArray} from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-fixture-listing',
  templateUrl: './fixture-listing.component.html',
  styleUrls: ['./fixture-listing.component.scss']
})
export class FixtureListingComponent implements OnInit {
  fixtures$;
  columnsToDisplay = ['homeTeamName', 'awayTeamName', 'division', 'time', 'court'];
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.pipe(
      select(selectCurrentSeasonId)
    ).subscribe(seasonId =>  {
          this.store.dispatch(loadMatches({seasonId}));
          this.fixtures$ = this.store.pipe(
            select(selectAllMatches),
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
