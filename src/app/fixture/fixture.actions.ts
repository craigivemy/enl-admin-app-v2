import { createAction, props } from '@ngrx/store';
import {Fixture} from '../models/fixture';
import {FixtureCollection} from '../models/fixture-collection';

export const loadFixtures = createAction(
  '[Fixture] Load Fixtures',
  props<{ seasonId: number }>()
);

export const loadFixturesSuccess = createAction(
  '[Fixture] Load Fixtures Success',
  props<{ fixtures: FixtureCollection[] }>()
);

export const loadFixturesFailure = createAction(
  '[Fixture] Load Fixtures Failure',
  props<{ error: any }>()
);
