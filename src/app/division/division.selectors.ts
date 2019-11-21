import {createFeatureSelector, createSelector} from "@ngrx/store";
import {DivisionState} from "./division.reducer";
import * as fromDivision from './division.reducer';

export const selectDivisionState = createFeatureSelector<DivisionState>('divisions');

export const selectAllDivisions = createSelector(
  selectDivisionState,
  fromDivision.selectAll
);

export const selectIfAllDivisionsLoaded = createSelector(
  selectDivisionState,
  divisionState => divisionState.allDivisionsWithTeamsLoaded
);
