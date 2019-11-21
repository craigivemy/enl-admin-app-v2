import { createAction, props } from '@ngrx/store';

export const loadFixtures = createAction(
  '[Fixture] Load Fixtures'
);

export const loadFixturesSuccess = createAction(
  '[Fixture] Load Fixtures Success',
  props<{ data: any }>()
);

export const loadFixturesFailure = createAction(
  '[Fixture] Load Fixtures Failure',
  props<{ error: any }>()
);
