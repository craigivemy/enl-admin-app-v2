import { Action, createReducer, on } from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Fixture} from '../models/fixture';
import * as FixtureActions from './fixture.actions';

export const fixtureFeatureKey = 'fixture';

export interface FixtureState extends EntityState<Fixture> {
  allFixturesLoaded: boolean;
}

const adapter: EntityAdapter<Fixture> = createEntityAdapter<Fixture>();

export const initialDivisionState: FixtureState = adapter.getInitialState({
  allFixturesLoaded: false
});

const fixtureReducer = createReducer(
  initialDivisionState,
  on(FixtureActions.loadFixturesSuccess, (state, {fixtures}) => {
    return adapter.addAll(fixtures, {...state, allFixturesLoaded: true});
  })
);

export function reducer(state: FixtureState | undefined, action: Action) {
  return fixtureReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
