import { Action, createReducer, on } from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Division} from "../models/division";
import * as DivisionActions from './division.actions';


export const divisionFeatureKey = 'division';

export interface DivisionState extends EntityState<Division> {
  allDivisionsWithTeamsLoaded: boolean;
}
const adapter: EntityAdapter<Division> = createEntityAdapter<Division>();

export const initialDivisionState: DivisionState = adapter.getInitialState( {
  allDivisionsWithTeamsLoaded: false
});

const divisionReducer = createReducer(
  initialDivisionState,
  on(DivisionActions.loadDivisionsWithTeamsSuccess, (state, {divisionsWithTeams}) => {
    return adapter.addAll(divisionsWithTeams, {...state, allDivisionsWithTeamsLoaded: true} );
  })

);

export function reducer(state: DivisionState | undefined, action: Action) {
  return divisionReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
