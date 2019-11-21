import { Action, createReducer, on } from '@ngrx/store';


export const fixtureFeatureKey = 'fixture';

export interface State {

}

export const initialState: State = {

};

const fixtureReducer = createReducer(
  initialState,

);

export function reducer(state: State | undefined, action: Action) {
  return fixtureReducer(state, action);
}
