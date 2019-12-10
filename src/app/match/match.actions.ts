import { createAction, props } from '@ngrx/store';
import {Match} from '../models/match';

export const loadMatches = createAction(
  '[Match] Load Fixtures',
  props<{ seasonId: number }>()
);

export const loadMatchesSuccess = createAction(
  '[Match] Load Fixtures Success',
  props<{ fixtures: Match[] }>()
);

export const loadMatchesFailure = createAction(
  '[Match] Load Fixtures Failure',
  props<{ error: any }>()
);
