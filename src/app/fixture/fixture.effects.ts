import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {FixtureService} from '../fixture.service';
import * as FixtureActions from './fixture.actions';
import {concatMap, filter, map, skipWhile, withLatestFrom} from 'rxjs/operators';
import {selectIfAllFixturesLoaded} from './fixture.selectors';



@Injectable()
export class FixtureEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private fixtureService: FixtureService
    ) {}

    loadAllFixtures$ = createEffect(() => this.actions$.pipe(
      ofType(FixtureActions.loadFixtures),
      map(action => action.seasonId),
      skipWhile(seasonId => seasonId <= 0),
      withLatestFrom(this.store.pipe(select(selectIfAllFixturesLoaded))),
      filter(([action, allFixturesLoaded]) => !allFixturesLoaded),
      concatMap(([action, fixtures]) =>
        this.fixtureService.getFixtures(action).pipe(
          map(allFixtures => FixtureActions.loadFixturesSuccess({fixtures: allFixtures}))
        )
      ))
    );
}
