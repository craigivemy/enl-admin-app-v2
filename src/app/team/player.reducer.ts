import { Action, createReducer, on } from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Player} from '../models/player';
import * as TeamActions from './team.actions';


export const playerFeatureKey = 'player';

export interface PlayerState extends EntityState<Player> {
  playersLoading: boolean;
  allPlayersLoaded: boolean;
}

const adapter: EntityAdapter<Player> = createEntityAdapter<Player>();

export const initialPlayerState: PlayerState = adapter.getInitialState({
  playersLoading: false,
  allPlayersLoaded: false
});

const playerReducer = createReducer(
  initialPlayerState,
  on(TeamActions.loadPlayersFromTeam, (state, {teamId}) => {
    return {
      ...state,
      playersLoading: true
    };
  }),
  on(TeamActions.loadPlayersFromTeamSuccess, (state, {players}) => {
    return adapter.addAll(players, {...state, playersLoading: false});
  }),
  on(TeamActions.loadAllPlayersSuccess, (state, {players}) => {
    return adapter.addAll(players, {...state, allPlayersLoaded: true});
  }),
  on(TeamActions.addPlayer, (state, {player}) => {
    return adapter.addOne(player, state);
  }),
  on(TeamActions.updatePlayer, (state, {player}) => {
    return adapter.updateOne(player, state);
  }),
  on(TeamActions.loadAllPlayedUpPlayersSuccess, (state, {players}) => {
    return adapter.addAll(players, state);
  })
);

export function reducer(state: PlayerState | undefined, action: Action) {
  return playerReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
