import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {DivisionService} from "../division.service";
import * as DivisionActions from './division.actions';
import {filter, map, mergeMap, switchMap, withLatestFrom} from "rxjs/operators";
import {selectIfAllDivisionsLoaded} from "./division.selector";
import {selectCurrentSeasonId} from "../season/season.selector";



@Injectable()
export class DivisionEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private divisionService: DivisionService
  ) {}

  loadDivisionsWithTeams$ = createEffect(() => this.actions$.pipe(
    ofType(DivisionActions.loadDivisionsWithTeams),
    map (action => action.seasonId),
    withLatestFrom(this.store.pipe(select(selectIfAllDivisionsLoaded))),
    filter(([action, allDivisionsLoaded]) => !allDivisionsLoaded),
    switchMap((action) =>
      this.divisionService.getDivisionsWithTeams(action).pipe(
        map(divisionsWithTeams => DivisionActions.loadDivisionsWithTeamsSuccess({divisionsWithTeams}))
      )
    ))
  );

}
