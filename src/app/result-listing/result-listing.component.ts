import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {selectCurrentSeasonId} from '../season/season.selectors';
import {loadMatches, matchUpdated} from '../match/match.actions';
import {selectAllMatches, selectWeeksFromMatches} from '../match/match.selectors';
import {filter} from 'rxjs/operators';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import {Division} from '../models/division';
import {DivisionService} from '../division.service';
import {FormControl} from '@angular/forms';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {Match} from '../models/match';
import {MatchService} from '../match.service';
import {MatchDialogComponent} from '../match-dialog/match-dialog.component';

moment.locale('en-gb');

@Component({
  selector: 'app-result-listing',
  templateUrl: './result-listing.component.html',
  styleUrls: ['./result-listing.component.scss']
})
export class ResultListingComponent implements OnInit {
  matchesWeeks$;
  columnsToDisplay = ['homeTeamName', 'homeTeamScore', 'awayTeamScore', 'awayTeamName', 'edit'];
  activeDivisions$: Observable<Division[]>;
  selectedWeek = new FormControl('');
  dataSource;
  constructor(
    private store: Store<AppState>,
    private divisionService: DivisionService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.store.pipe(
      select(selectCurrentSeasonId),
      filter(seasonId => seasonId > 0),
    ).subscribe(seasonId =>  {
      this.store.dispatch(loadMatches({seasonId}));
      this.activeDivisions$ = this.divisionService.getActiveDivisions(seasonId);
      this.matchesWeeks$ = this.store.pipe(
        select(selectWeeksFromMatches),
      );
      this.store.pipe(select(selectAllMatches)).subscribe(matches => this.dataSource = new MatTableDataSource(matches));
    });

    this.selectedWeek.valueChanges.subscribe(
      week => {
        this.dataSource.filter = moment(week).format('YYYY-MM-DD');
      }
    );
  }

  openEditDialog(match: Match): void {
    const dialogRef = this.dialog.open(MatchDialogComponent, {
      data: {match}
    });
    // todo try to prevent having to do this
    dialogRef.afterClosed().subscribe(response => {
      if (response.updated) {
        this.selectedWeek.setValue(this.selectedWeek.value);
      }
    });

  }

}
