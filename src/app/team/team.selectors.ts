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

// todo get this to work ie datasource to update
export const selectPlayersByTeamId = teamId => createSelector(
  selectPlayers,
  allPlayers => allPlayers.filter(player => player.teamId === teamId)
);

export const selectIfPlayersLoading = createSelector(
  selectPlayerState,
  playerState => playerState.playersLoading
);
