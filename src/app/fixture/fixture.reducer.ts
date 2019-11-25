import { Action, createReducer, on } from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Fixture} from '../models/fixture';
import * as FixtureActions from './fixture.actions';
import {FixtureCollection} from '../models/fixture-collection';


export const fixtureFeatureKey = 'fixture';

export interface FixtureState extends EntityState<FixtureCollection> {
  allFixturesLoaded: boolean;
}

const adapter: EntityAdapter<FixtureCollection> = createEntityAdapter<FixtureCollection>();

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
