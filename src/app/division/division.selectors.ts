import {createFeatureSelector, createSelector} from "@ngrx/store";
import {DivisionState} from "./division.reducer";
import * as fromDivision from './division.reducer';
import {adapter} from '../season/season.reducer';

export const selectDivisionState = createFeatureSelector<DivisionState>('division');

export const selectAllDivisionsWithTeams = createSelector(
  selectDivisionState,
  fromDivision.selectAll
);

export const selectIfAllDivisionsWithTeamsLoaded = createSelector(
  selectDivisionState,
  divisionState => divisionState.allDivisionsWithTeamsLoaded
);

export const selectDivisionById = divisionId => createSelector(
  selectDivisionState,
  divisionState => divisionState.entities[divisionId]
);
