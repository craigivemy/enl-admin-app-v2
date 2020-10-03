import {Component, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {selectCurrentSeasonId} from '../season/season.selectors';
import {loadMatches} from '../match/match.actions';
import {selectAllMatches} from '../match/match.selectors';
import {filter, groupBy, mergeMap, take, toArray} from 'rxjs/operators';
import * as moment from 'moment';
import {Match} from "../models/match";
import {MatDialog, MatTable} from "@angular/material";
import {EditFixtureDialogComponent} from "../edit-fixture-dialog/edit-fixture-dialog.component";
import {PageTitleService} from "../page-title.service";

@Component({
  selector: 'app-fixture-listing',
  templateUrl: './fixture-listing.component.html',
  styleUrls: ['./fixture-listing.component.scss']
})
export class FixtureListingComponent implements OnInit {
  @ViewChild(MatTable, {static: false}) fixtureTable: MatTable<any>;
  fixtures$;
  columnsToDisplay = ['homeTeamName', 'awayTeamName', 'division', 'time', 'court', 'edit'];

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private pageTitleService: PageTitleService
  ) {
    pageTitleService.title.next('Fixtures');
  }

  ngOnInit() {
    this.store.pipe(
      select(selectCurrentSeasonId)
    ).subscribe(seasonId => {
      this.store.dispatch(loadMatches({seasonId}));
      this.fixtures$ = this.store.pipe(
        select(selectAllMatches),
        filter(arr => arr.length > 0),
        take(1),
        mergeMap(fixtures => fixtures),
        groupBy(fixture => moment(fixture.matchDate).format('YYYY-MM-DD')),
        mergeMap(group => group.pipe(toArray())),
        toArray()
      );

    });
  }

  openEditDialog(fixture: Match) {
    const dialogRef = this.dialog.open(EditFixtureDialogComponent, {
      data: {fixture}
    });
    dialogRef.afterClosed().subscribe(
      () => {
        // todo - this doesn't work
        // this.fixtureTable.renderRows();
      }
    );
  }
}
