import { createAction, props } from '@ngrx/store';
import {Team} from '../models/team';
import {Player} from '../models/player';
import {Update} from '@ngrx/entity';

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

export const loadPlayersFromTeam = createAction(
  '[Team] Load Players',
  props<{teamId: number}>()
);

export const loadPlayersSuccess = createAction(
  '[Team] Load Players Success',
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

/* todo - should I be loading all teams to start with, then just selecting based on divison ID?
  As long as only divisions that are active are there this would work???
 */


