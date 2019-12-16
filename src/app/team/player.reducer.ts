import { Action, createReducer, on } from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Player} from '../models/player';
import * as TeamActions from './team.actions';


export const playerFeatureKey = 'player';

export interface PlayerState extends EntityState<Player> {
  playersLoading: boolean;
}

const adapter: EntityAdapter<Player> = createEntityAdapter<Player>();

export const initialPlayerState: PlayerState = adapter.getInitialState({
  playersLoading: false
});

const playerReducer = createReducer(
  initialPlayerState,
  on(TeamActions.loadPlayersFromTeam, (state, {teamId}) => {
    return {
      ...state,
      playersLoading: true
    };
  }),
  on(TeamActions.loadPlayersSuccess, (state, {players}) => {
    return adapter.addMany(players, {...state, playersLoading: true});
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