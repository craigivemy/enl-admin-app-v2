import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FixtureState} from './fixture.reducer';
import * as fromFixture from './fixture.reducer';

export const selectFixtureState = createFeatureSelector<FixtureState>('fixture');

export const selectAllFixtures = createSelector(
  selectFixtureState,
  fromFixture.selectAll
);

export const selectIfAllFixturesLoaded = createSelector(
  selectFixtureState,
  fixtureState => fixtureState.allFixturesLoaded
);

export const selectFixturesByDivisions = divisionId => createSelector(
  selectAllFixtures,
  allFixtures => allFixtures.filter(
    fixture => fixture.divisionId === divisionId
  )
);
