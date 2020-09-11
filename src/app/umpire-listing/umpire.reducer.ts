import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Umpire } from '../models/umpire';
import * as UmpireActions from './umpire.actions';

export const umpireFeatureKey = 'umpire';

export interface UmpireState extends EntityState<Umpire> {
  allUmpiresLoaded: boolean;
}

export const adapter: EntityAdapter<Umpire> = createEntityAdapter<Umpire>();

export const initialState: UmpireState = adapter.getInitialState({
  allUmpiresLoaded: false
});

const umpireReducer = createReducer(
  initialState,
  on(UmpireActions.loadUmpiresSuccess, (state, {umpires}) => {
    return adapter.addAll(umpires, {...state, allUmpiresLoaded: true});
  }),
  on(UmpireActions.addUmpire,
    (state, action) => adapter.addOne(action.umpire, state)
  ),
  on(UmpireActions.upsertUmpire,
    (state, action) => adapter.upsertOne(action.umpire, state)
  ),
  on(UmpireActions.addUmpires,
    (state, action) => adapter.addMany(action.umpires, state)
  ),
  on(UmpireActions.upsertUmpires,
    (state, action) => adapter.upsertMany(action.umpires, state)
  ),
  on(UmpireActions.updateUmpire,
    (state, action) => adapter.updateOne(action.umpire, state)
  ),
  on(UmpireActions.updateUmpires,
    (state, action) => adapter.updateMany(action.umpires, state)
  ),
  on(UmpireActions.deleteUmpire,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(UmpireActions.deleteUmpires,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(UmpireActions.clearUmpires,
    state => adapter.removeAll(state)
  ),
);

export function reducer(state: UmpireState | undefined, action: Action) {
  return umpireReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
