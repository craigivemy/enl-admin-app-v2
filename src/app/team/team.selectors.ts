import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TeamState} from './team.reducer';
import * as fromTeam from './team.reducer';
import {PlayerState} from './player.reducer';
import * as fromPlayer from './player.reducer';

export const selectTeamState = createFeatureSelector<TeamState>('team');
export const selectPlayerState = createFeatureSelector<PlayerState>('player');

export const selectAllTeams = createSelector(
  selectTeamState,
  fromTeam.selectAll
);

export const selectTeamById = teamId => createSelector(
  selectTeamState,
  teamState => teamState.entities[teamId]
);

export const selectPlayers = createSelector(
  selectPlayerState,
  fromPlayer.selectAll
);
