import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {DivisionService} from "../division.service";
import {Observable} from "rxjs";
import {Division} from "../models/division";
import {selectCurrentSeasonId} from "../season/season.selectors";
import {filter} from "rxjs/operators";
import {loadTables} from "./table.actions";
import {Table} from "../models/table";
import {selectAllTables, selectTableByDivisionId} from './table.selectors';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  activeDivisions$: Observable<Division[]>;
  tables$: Observable<Table[]>;
  columnsToDisplay = ['teamName', 'win', 'draw', 'loss', 'goalsFor', 'goalsAgainst', 'goalDifference', 'points'];
  dataSource;
  constructor(
    private store: Store<AppState>,
    private divisionService: DivisionService,

  ) { }

  ngOnInit() {
    this.store.pipe(
      select(selectCurrentSeasonId),
      filter(seasonId => seasonId > 0),
    ).subscribe(seasonId => {
      this.store.dispatch(loadTables({seasonId}));
      this.activeDivisions$ = this.divisionService.getActiveDivisions(seasonId);
    });
  }

  test(event: any) {
    this.tables$ = this.store.pipe(
      select(selectTableByDivisionId(parseInt(event.tab.textLabel)))
    );
  }


}
