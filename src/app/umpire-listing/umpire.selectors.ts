import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UmpireState} from "./umpire.reducer";
import * as fromUmpire from './umpire.reducer';

export const selectUmpireState = createFeatureSelector<UmpireState>('umpire');

export const selectAllUmpires = createSelector(
  selectUmpireState,
  fromUmpire.selectAll
);

export const selectIfAllUmpiresLoaded = createSelector(
  selectUmpireState,
  umpireState => umpireState.allUmpiresLoaded
);
