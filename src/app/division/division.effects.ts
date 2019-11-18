import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {DivisionService} from "../division.service";
import * as DivisionActions from './division.actions';
import {concatMap, filter, map, mergeMap, skip, skipWhile, switchMap, takeWhile, tap, withLatestFrom} from 'rxjs/operators';
import {selectIfAllDivisionsLoaded} from "./division.selector";
import {selectCurrentSeasonId} from "../season/season.selector";



@Injectable()
export class DivisionEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private divisionService: DivisionService
  ) {}

  loadDivisionsWithTeams$ =  createEffect(() => this.actions$.pipe(
    ofType(DivisionActions.loadDivisionsWithTeams),
    map (action => action.seasonId),
    skipWhile(seasonId => seasonId <= 0),
    withLatestFrom(this.store.pipe(select(selectIfAllDivisionsLoaded))),
    filter(([action, allDivisionsLoaded]) => !allDivisionsLoaded),
    concatMap(([action, divisions]) =>
      this.divisionService.getDivisionsWithTeams(action).pipe(
        map(divisionsWithTeams => DivisionActions.loadDivisionsWithTeamsSuccess({divisionsWithTeams}))
      )
    ))
  );
}
