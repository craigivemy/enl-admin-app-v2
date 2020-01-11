import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TableService} from "../table.service";
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import * as TableActions from './table.actions';
import {concatMap, filter, map, skipWhile, withLatestFrom} from "rxjs/operators";
import {selectIfAllTablesLoaded} from './table.selectors';

@Injectable()
export class TableEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private tableService: TableService
    ) {}

    loadTables$ = createEffect(() => this.actions$.pipe(
      ofType(TableActions.loadTables),
      map(action => action.seasonId),
      skipWhile(seasonId => seasonId <= 0),
      withLatestFrom(this.store.pipe(select(selectIfAllTablesLoaded))),
      filter(([action, allTablesLoaded]) => !allTablesLoaded),
      concatMap(([action, tables]) =>
        this.tableService.getTables(action).pipe(
          map(allTables => TableActions.loadTablesSuccess({tables: allTables}))
        )
      ))
    );
}
