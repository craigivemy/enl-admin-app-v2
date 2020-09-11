import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {UmpireService} from "../umpire.service";
import * as UmpireActions from './umpire.actions';
import {filter, map, mergeMap, withLatestFrom} from "rxjs/operators";
import {selectIfAllUmpiresLoaded} from "./umpire.selectors";


@Injectable()
export class UmpireEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private umpireService: UmpireService
  ) {}

  loadUmpires$ = createEffect(() => this.actions$.pipe(
    ofType(UmpireActions.loadUmpires),
    withLatestFrom(this.store.pipe(select(selectIfAllUmpiresLoaded))),
    filter(([action, allUmpiresLoaded]) => !allUmpiresLoaded),
    mergeMap(() =>
      this.umpireService.getUmpires().pipe(
        map(umpires => UmpireActions.loadUmpiresSuccess({umpires}))
      )
    )
  ));

}
