import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {SeasonService} from "../season.service";
import * as SeasonActions from './season.actions';
import {catchError, filter, map, mergeMap, tap, withLatestFrom} from "rxjs/operators";
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {selectAllSeasons, selectIfAllSeasonsLoaded} from "./season.selectors";
import {EMPTY} from "rxjs";
import {loadSeasonsSuccess} from "./season.actions";

@Injectable()
export class SeasonEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private seasonService: SeasonService
  ) {}

  loadAllSeasons$ = createEffect(() => this.actions$.pipe(
    ofType(SeasonActions.loadSeasons),
    withLatestFrom(this.store.pipe(select(selectIfAllSeasonsLoaded))),
    filter(([action, allSeasonsLoaded]) => !allSeasonsLoaded),
    mergeMap(() =>
      this.seasonService.getSeasons().pipe(
        map(seasons => SeasonActions.loadSeasonsSuccess({seasons}))
      )
    )
  ));

  addSeasonRedirect$ = createEffect(() => this.actions$.pipe(
    // todo - should be add season success?
    ofType(SeasonActions.addSeason),
    tap(() => window.location.href = '/teams')
  ),
{dispatch: false}
  );


}
