import { Action, createReducer, on } from '@ngrx/store';
import {Season} from "../models/season";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import * as SeasonActions from './season.actions';


export const seasonFeatureKey = 'season';

export interface SeasonState extends EntityState<Season> {
  currentSeasonId: number;
  allSeasonsLoaded: boolean;
}

export const adapter: EntityAdapter<Season> = createEntityAdapter<Season>();

export const initialSeasonState: SeasonState = adapter.getInitialState({
  currentSeasonId: null,
  allSeasonsLoaded: false
});

const seasonReducer = createReducer(
  initialSeasonState,
  on(SeasonActions.loadSeasonsSuccess, (state, {seasons}) => {
    return adapter.addAll(seasons, {...state, allSeasonsLoaded: true});
  }),
  on(SeasonActions.addSeason, (state, {season}) => {
    return adapter.addOne(season, {...state});
  })
);

export function reducer(state: SeasonState | undefined, action: Action) {
  return seasonReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
