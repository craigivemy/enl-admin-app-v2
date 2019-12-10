import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MatchState} from './match.reducer';
import * as fromMatch from './match.reducer';
import * as moment from 'moment';

moment.locale('en-gb');

export const selectMatchState = createFeatureSelector<MatchState>('match');

export const selectAllMatches = createSelector(
  selectMatchState,
  fromMatch.selectAll
);

export const selectIfAllMatchesLoaded = createSelector(
  selectMatchState,
  fixtureState => fixtureState.allMatchesLoaded
);

export const selectMacthesByDivisions = divisionId => createSelector(
  selectAllMatches,
  allMatches => allMatches.filter(
    match => match.divisionId === divisionId
  )
);

export const selectWeeksFromMatches = createSelector(
  selectAllMatches,
  allMatches => {
    const dates = allMatches.map(
      match => moment(match.matchDate).format('YYYY-MM-DD')
    );
    return [...new Set(dates)];
  }
);
