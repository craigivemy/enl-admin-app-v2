import { Action, createReducer, on } from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Match} from '../models/match';
import * as MatchActions from './match.actions';

export const matchFeatureKey = 'match';

export interface MatchState extends EntityState<Match> {
  allMatchesLoaded: boolean;
}

const adapter: EntityAdapter<Match> = createEntityAdapter<Match>();

export const initialDivisionState: MatchState = adapter.getInitialState({
  allMatchesLoaded: false
});

const matchReducer = createReducer(
  initialDivisionState,
  on(MatchActions.loadMatchesSuccess, (state, {matches}) => {
    return adapter.addAll(matches, {...state, allMatchesLoaded: true});
  }),
  on(MatchActions.matchUpdated, (state, {match}) => {
    return adapter.updateOne(match, state);
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
