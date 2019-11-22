import {createFeatureSelector, createSelector} from "@ngrx/store";
import {Season} from "../models/season";
import {SeasonState} from "./season.reducer";
import * as fromSeason from './season.reducer';

export const selectSeasonState = createFeatureSelector<SeasonState>('season');

export const selectAllSeasons = createSelector(
  selectSeasonState,
  fromSeason.selectAll
);

export const selectIfAllSeasonsLoaded = createSelector(
  selectSeasonState,
  seasonState => seasonState.allSeasonsLoaded
);

export const selectCurrentSeason = createSelector(
  selectAllSeasons,
  allSeasons => allSeasons.filter(season => season.current === 1)
);

export const selectCurrentSeasonId = createSelector(
  selectCurrentSeason,
  currentSeason => currentSeason[0] ? currentSeason[0].id : -1
);

