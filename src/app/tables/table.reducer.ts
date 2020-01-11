import { Action, createReducer, on } from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Table} from "../models/table";
import * as TableActions from './table.actions';


export const tableFeatureKey = 'table';

export interface TableState extends EntityState<Table> {
  allTablesLoaded: boolean;
}

export const adapter: EntityAdapter<Table> = createEntityAdapter<Table>();

export const initialTableState: TableState = adapter.getInitialState({
  allTablesLoaded: false
});

const tableReducer = createReducer(
  initialTableState,
  on(TableActions.loadTablesSuccess, (state, {tables}) => {
    return adapter.addAll(tables, {...state, allTablesLoaded: true});
  })
);

export function reducer(state: TableState | undefined, action: Action) {
  return tableReducer(state, action);
}

export const {
  selectAll
} = adapter.getSelectors();
