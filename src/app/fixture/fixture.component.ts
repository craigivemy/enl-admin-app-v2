import {Component, Input, OnInit} from '@angular/core';
import {Fixture} from '../models/fixture';
import {Division} from '../models/division';
import {Observable} from 'rxjs';
import {AppState} from '../reducers';
import {select, Store} from '@ngrx/store';
import {selectDivisionById} from '../division/division.selectors';
import {map, mergeMap, tap} from 'rxjs/operators';
import {selectCurrentSeasonId} from '../season/season.selectors';
import {loadFixtures} from './fixture.actions';
import {DivisionService} from '../division.service';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.scss']
})
export class FixtureComponent implements OnInit {
  @Input() fixture: Fixture;
  constructor(
    private store: Store<AppState>,
    private divisionService: DivisionService
  ) { }

  ngOnInit() {}

}
