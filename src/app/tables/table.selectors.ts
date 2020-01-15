import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TableState} from "./table.reducer";
import * as fromTable from './table.reducer';

export const selectTableState = createFeatureSelector<TableState>('table');

export const selectAllTables = createSelector(
  selectTableState,
  fromTable.selectAll
);

export const selectIfAllTablesLoaded = createSelector(
  selectTableState,
  tableState => tableState.allTablesLoaded
);

export const selectTableByDivisionId = divisionId => createSelector(
  selectAllTables,
  allTables => allTables.filter(
    table => table["division_id"] === divisionId
  )
);

