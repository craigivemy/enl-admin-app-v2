import { createAction, props } from '@ngrx/store';

export const loadTeams = createAction(
  '[Team] Load Teams'
);

export const loadTeamsSuccess = createAction(
  '[Team] Load Teams Success',
  props<{ data: any }>()
);

export const loadTeamsFailure = createAction(
  '[Team] Load Teams Failure',
  props<{ error: any }>()
);
