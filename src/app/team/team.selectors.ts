import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TeamState} from './team.reducer';
import * as fromTeam from './team.reducer';

export const selectTeamState = createFeatureSelector<TeamState>('teams');

export const selectAllTeams = createSelector(
  selectTeamState,
  fromTeam.selectAll
);

export const selectTeamById = teamId => createSelector(
  selectTeamState,
  teamState => teamState.entities[teamId]
);
