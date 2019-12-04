import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FixtureState} from './fixture.reducer';
import * as fromFixture from './fixture.reducer';
import * as moment from 'moment';

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

export const selectWeeksFromFixtures = createSelector(
  selectAllFixtures,
  allFixtures => {
    const dates = allFixtures.map(
      fixture => moment(fixture.matchDate)
    );
    return [...new Set(dates)];
  }
);

// todo - either below or just get active divisions as observable not store though,
// todo - and subscribe to changes which filter when clicking on new tab
// export const selectDivisionsFromFixtures = createSelector(
//   selectAllFixtures,
//   allFixtures => {
//     const divisions = allFixtures.map(
//       fixture => ({
//         id: fixture.divisionId,
//         name: fixture.
//       })
//     )
//   }
// )
