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

export const selectIfAllTeamsLoaded = createSelector(
  selectTeamState,
  teamState => teamState.allTeamsLoaded
);

export const selectTeamById = teamId => createSelector(
  selectTeamState,
  teamState => teamState.entities[teamId]
);

export const selectOnlyNonDeletedTeams = createSelector(
  selectAllTeams,
  teams => teams.filter(team => !team.deletedAt)
);

export const selectDeletedTeams = createSelector(
  selectAllTeams,
  teams => teams.filter(team => team.deletedAt)
);

export const selectActiveTeams = createSelector(
  selectAllTeams,
  teams => teams.filter(team => team.activeThisSeason && !team.deletedAt)
);

export const selectInactiveTeams = createSelector(
  selectAllTeams,
  teams => teams.filter(team => !team.activeThisSeason && !team.deletedAt)
);

export const selectAllPlayers = createSelector(
  selectPlayerState,
  fromPlayer.selectAll
);

export const selectIfAllPlayersLoaded = createSelector(
  selectPlayerState,
  playerState => playerState.allPlayersLoaded
);

// todo get this to work ie datasource to update
// export const selectPlayersByTeamId = teamId => createSelector(
//   selectAllPlayers,
//   allPlayers => allPlayers.filter(player => player.teamId === teamId)
// );

export const selectIfPlayersLoading = createSelector(
  selectPlayerState,
  playerState => playerState.playersLoading
);
