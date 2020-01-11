import { createAction, props } from '@ngrx/store';
import {Table} from "../models/table";

export const loadTables = createAction(
  '[Table] Load Tables',
  props<{ seasonId: number }>()
);

export const loadTablesSuccess = createAction(
  '[Table] Load Tables Success',
  props<{ tables: Table[] }>()
);

export const loadTablesFailure = createAction(
  '[Table] Load Tables Failure',
  props<{ error: any }>()
);
