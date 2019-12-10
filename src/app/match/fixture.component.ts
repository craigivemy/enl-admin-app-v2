import {Component, Input, OnInit} from '@angular/core';
import {Match} from '../models/match';
import {Division} from '../models/division';
import {Observable} from 'rxjs';
import {AppState} from '../reducers';
import {select, Store} from '@ngrx/store';
import {selectDivisionById} from '../division/division.selectors';
import {map, mergeMap, tap} from 'rxjs/operators';
import {selectCurrentSeasonId} from '../season/season.selectors';
import {loadMatches} from './match.actions';
import {DivisionService} from '../division.service';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.scss']
})
export class FixtureComponent implements OnInit {
  @Input() fixture: Match;
  constructor(
    private store: Store<AppState>,
    private divisionService: DivisionService
  ) { }

  ngOnInit() {}

}
