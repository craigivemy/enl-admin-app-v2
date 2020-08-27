import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {selectCurrentSeasonId} from "../season/season.selectors";
import {Observable} from "rxjs";
import {Label, MultiDataSet, SingleDataSet, ThemeService} from "ng2-charts";
import {ChartType} from "chart.js";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentSeasonId: Observable<number>;
  public doughnutChartData: SingleDataSet = [1, 2, 3];
  public doughnutChartLabels: Label[] = ['A', 'B', 'C'];
  public doughnutChartType: ChartType = 'doughnut';
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.currentSeasonId = this.store
      .pipe(
        select(selectCurrentSeasonId)
      );
  }

}
