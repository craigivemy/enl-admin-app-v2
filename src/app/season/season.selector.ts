import {createFeatureSelector, createSelector} from "@ngrx/store";
import {Season} from "../models/season";
import {SeasonState} from "./season.reducer";
import * as fromSeason from './season.reducer';

export const selectSeasonState = createFeatureSelector<SeasonState>('seasons');

export const selectAllSeasons = createSelector(
  selectSeasonState,
  fromSeason.selectAll
);

export const selectIfAllSeasonsLoaded = createSelector(
  selectSeasonState,
  seasonState => seasonState.allSeasonsLoaded
);

export const selectCurrentSeasonId = createSelector(
  selectAllSeasons,
  allSeasons => {
    const currentSeason = allSeasons.filter(
      season => season.current === 1
    );
    return currentSeason[0] ? currentSeason[0].id : 0;
  }
);

