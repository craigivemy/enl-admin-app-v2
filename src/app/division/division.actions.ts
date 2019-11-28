import { createAction, props } from '@ngrx/store';

export const loadDivisionsWithTeams = createAction(
  '[Division] Load Divisions',
  props<{seasonId: number}>()
);

export const loadDivisionsWithTeamsSuccess = createAction(
  '[Division] Load Divisions Success',
  props<{ divisionsWithTeams: any }>()
);

export const loadDivisionsFailure = createAction(
  '[Division] Load Divisions Failure',
  props<{ error: any }>()
);

export const loadActiveDivisions = createAction(
  '[Division] Load Active Divisions',
  props<{seasonId: number}>()
);

export const loadActiveDivisionsSuccess = createAction(
  '[Division] Load Active Divisions Success',
  props<{ divisionsWithTeams: any }>()
);
