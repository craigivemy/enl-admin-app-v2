import { createAction, props } from '@ngrx/store';
import {Season} from "../models/season";

export const loadSeasons = createAction(
  '[Season] Load Seasons'
);

export const loadSeasonsSuccess = createAction(
  '[Season] Load Seasons Success',
  props<{ seasons: Season[] }>()
);

export const loadSeasonsFailure = createAction(
  '[Season] Load Seasons Failure',
  props<{ error: any }>()
);

export const addSeason = createAction(
  '[Season] Season Created',
  props<{season: Season}>()
);
