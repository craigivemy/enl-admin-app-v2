import { Action, createReducer, on } from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Team} from '../models/team';
import * as TeamActions from './team.actions';


export const teamFeatureKey = 'team';

export interface TeamState extends EntityState<Team> {
  allTeamsLoaded: boolean;
}
const adapter: EntityAdapter<Team> = createEntityAdapter<Team>();

export const initialTeamState: TeamState = adapter.getInitialState({
  allTeamsLoaded: false
});

const teamReducer = createReducer(
  initialTeamState,
  on(TeamActions.loadTeamsSuccess, (state, {teams}) => {
    return adapter.addAll(teams, {...state, allTeamsLoaded: true});
  }),
  on(TeamActions.loadTeamSuccess, (state, {team}) => {
    return adapter.addOne(team, state);
  })

);

export function reducer(state: TeamState | undefined, action: Action) {
  return teamReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
