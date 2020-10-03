import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Division} from "../models/division";
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {DivisionService} from "../division.service";
import {selectCurrentSeasonId} from "../season/season.selectors";
import {filter} from "rxjs/operators";
import {Team} from "../models/team";
import {TeamService} from "../team.service";
import {selectAllDivisionsWithTeams} from "../division/division.selectors";
import {loadDivisionsWithTeams} from "../division/division.actions";
import {loadTables} from "../tables/table.actions";
import {selectTableByDivisionId} from "../tables/table.selectors";
import {Table} from "../models/table";
import {MatDialog} from "@angular/material";
import {DeductPointsDialogComponent} from "../deduct-points-dialog/deduct-points-dialog.component";
import {PageTitleService} from "../page-title.service";

@Component({
  selector: 'app-deduct-points',
  templateUrl: './deduct-points.component.html',
  styleUrls: ['./deduct-points.component.scss']
})

export class DeductPointsComponent implements OnInit {
  activeDivisions$: Observable<Division[]>;
  teams$: Observable<Table[]>;
  constructor(
    private store: Store<AppState>,
    private divisionService: DivisionService,
    public dialog: MatDialog,
    private pageTitleService: PageTitleService
  ) {
    pageTitleService.title.next('Deduct Points');
  }

  ngOnInit() {
    this.store.pipe(
      select(selectCurrentSeasonId),
      filter(seasonId => seasonId > 0),
    ).subscribe(seasonId => {
      this.store.dispatch(loadTables({seasonId}));
      this.activeDivisions$ = this.divisionService.getActiveDivisions(seasonId);
    });
  }

  teamsByDivisionIdFromTab(event: any) {
    this.teams$ = this.store.pipe(
      select(selectTableByDivisionId(parseInt(event.tab.textLabel)))
    );
  }

  editDeductions(team: Team) {
    const dialogRef = this.dialog.open(DeductPointsDialogComponent, {
      data: {team}
    });
  }

}
