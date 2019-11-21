import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {Observable} from 'rxjs';
import {Fixture} from '../models/fixture';
import {selectCurrentSeasonId} from '../season/season.selector';

@Component({
  selector: 'app-fixture-listing',
  templateUrl: './fixture-listing.component.html',
  styleUrls: ['./fixture-listing.component.scss']
})
export class FixtureListingComponent implements OnInit {
  fixtures$: Observable<Fixture[]>;
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.pipe(
      select(selectCurrentSeasonId)
    ).subscribe(seasonId => '') // todo implement store here
  }

}
