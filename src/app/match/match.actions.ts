import { createAction, props } from '@ngrx/store';
import {Match} from '../models/match';
import {Update} from '@ngrx/entity';

export const loadMatches = createAction(
  '[Match] Load Fixtures',
  props<{ seasonId: number }>()
);

export const loadMatchesSuccess = createAction(
  '[Match] Load Fixtures Success',
  props<{ matches: Match[] }>()
);

export const loadMatchesFailure = createAction(
  '[Match] Load Fixtures Failure',
  props<{ error: any }>()
);

export const matchUpdated = createAction(
  '[Match] Match Updated',
  props<{match: Update<Match>}>()
);
