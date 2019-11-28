import {createFeatureSelector, createSelector} from "@ngrx/store";
import {DivisionState} from "./division.reducer";
import * as fromDivision from './division.reducer';

export const selectDivisionState = createFeatureSelector<DivisionState>('division');

export const selectAllDivisionsWithTeams = createSelector(
  selectDivisionState,
  fromDivision.selectAll
);

export const selectIfAllDivisionsWithTeamsLoaded = createSelector(
  selectDivisionState,
  divisionState => divisionState.allDivisionsWithTeamsLoaded
);
