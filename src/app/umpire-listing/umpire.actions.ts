import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Umpire } from '../models/umpire';

export const loadUmpires = createAction(
  '[Umpire/API] Load Umpires',
);
export const loadUmpiresSuccess = createAction(
  '[Umpire] Load Umpires Success',
  props<{ umpires: Umpire[] }>()
);
export const addUmpire = createAction(
  '[Umpire/API] Add Umpire',
  props<{ umpire: Umpire }>()
);

export const upsertUmpire = createAction(
  '[Umpire/API] Upsert Umpire',
  props<{ umpire: Umpire }>()
);

export const addUmpires = createAction(
  '[Umpire/API] Add Umpires',
  props<{ umpires: Umpire[] }>()
);

export const upsertUmpires = createAction(
  '[Umpire/API] Upsert Umpires',
  props<{ umpires: Umpire[] }>()
);

export const updateUmpire = createAction(
  '[Umpire/API] Update Umpire',
  props<{ umpire: Update<Umpire> }>()
);

export const updateUmpires = createAction(
  '[Umpire/API] Update Umpires',
  props<{ umpires: Update<Umpire>[] }>()
);

export const deleteUmpire = createAction(
  '[Umpire/API] Delete Umpire',
  props<{ id: number }>()
);

export const deleteUmpires = createAction(
  '[Umpire/API] Delete Umpires',
  props<{ ids: string[] }>()
);

export const clearUmpires = createAction(
  '[Umpire/API] Clear Umpires'
);
