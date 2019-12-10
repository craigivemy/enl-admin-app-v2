import { Action, createReducer, on } from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Match} from '../models/match';
import * as FixtureActions from './match.actions';

export const fixtureFeatureKey = 'match';

export interface MatchState extends EntityState<Match> {
  allMatchesLoaded: boolean;
}

const adapter: EntityAdapter<Match> = createEntityAdapter<Match>();

export const initialDivisionState: MatchState = adapter.getInitialState({
  allMatchesLoaded: false
});

const matchReducer = createReducer(
  initialDivisionState,
  on(FixtureActions.loadMatchesSuccess, (state, {fixtures}) => {
    return adapter.addAll(fixtures, {...state, allMatchesLoaded: true});
  })
);

export function reducer(state: MatchState | undefined, action: Action) {
  return matchReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
