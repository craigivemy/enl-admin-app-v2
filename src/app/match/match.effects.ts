import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {MatchService} from '../match.service';
import * as MatchActions from './match.actions';
import {concatMap, filter, map, skipWhile, withLatestFrom} from 'rxjs/operators';
import {selectIfAllMatchesLoaded} from './match.selectors';



@Injectable()
export class MatchEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private fixtureService: MatchService
    ) {}

    loadAllMatches$ = createEffect(() => this.actions$.pipe(
      ofType(MatchActions.loadMatches),
      map(action => action.seasonId),
      skipWhile(seasonId => seasonId <= 0),
      withLatestFrom(this.store.pipe(select(selectIfAllMatchesLoaded))),
      filter(([action, allMatchesLoaded]) => !allMatchesLoaded),
      concatMap(([action, matches]) =>
        this.fixtureService.getFixtures(action).pipe(
          map(allMatches => MatchActions.loadMatchesSuccess({matches: allMatches}))
        )
      ))
    );
}
