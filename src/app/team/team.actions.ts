import { createAction, props } from '@ngrx/store';
import {Team} from '../models/team';
import {Player} from '../models/player';
import {Update} from '@ngrx/entity';
import {PlayedUp} from "../models/playedUp";

export const loadTeams = createAction(
  '[Team] Load Teams'
);

export const loadTeamsSuccess = createAction(
  '[Team] Load Teams Success',
  props<{ teams: Team[] }>()
);

export const loadTeamsFailure = createAction(
  '[Team] Load Teams Failure',
  props<{ error: any }>()
);

export const loadTeam = createAction(
  '[Team] Load Team',
  props<{teamId: number}>()
);

export const loadTeamSuccess = createAction(
  '[Team] Load Team Success',
  props<{team: Team}>()
);

export const addTeam = createAction(
  '[Team] Add Team',
  props<{team: Team}>()
);

export const updateTeam = createAction(
  'Team Update Team',
  props<{team: Update<Team>}>()
);

export const loadPlayersFromTeam = createAction(
  '[Team] Load Players',
  props<{teamId: number, seasonId: number}>()
);

export const loadPlayersSuccess = createAction(
  '[Team] Load Players Success',
  props<{players: Player[]}>()
);

export const loadAllPlayedUpPlayers = createAction(
  '[Player] Load Played Up Players',
  props<{seasonId: number}>()
);

export const loadAllPlayedUpPlayersSuccess = createAction(
  '[Player] Load Played Up Players Success',
  props<{players: Player[]}>()
);

export const addPlayer = createAction(
  '[Team] Add Player',
  props<{player: Player}>()
);

export const updatePlayer = createAction(
  'Team Update Player',
  props<{player: Update<Player>}>()
);

export const addPlayedUp = createAction(
  'Team Add Played Ups',
  props<{playedUp: PlayedUp, playerId: number, seasonId: number}>()
);

/* todo - should I be loading all teams to start with, then just selecting based on divison ID?
  As long as only divisions that are active are there this would work???
 */


