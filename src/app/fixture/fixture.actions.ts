import { createAction, props } from '@ngrx/store';
import {Fixture} from '../models/fixture';

export const loadFixtures = createAction(
  '[Fixture] Load Fixtures',
  props<{ seasonId: number }>()
);

export const loadFixturesSuccess = createAction(
  '[Fixture] Load Fixtures Success',
  props<{ fixtures: Fixture[] }>()
);

export const loadFixturesFailure = createAction(
  '[Fixture] Load Fixtures Failure',
  props<{ error: any }>()
);
