import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {selectCurrentSeasonId} from "../season/season.selectors";
import {Observable} from "rxjs";
import {Label, MultiDataSet, SingleDataSet, ThemeService} from "ng2-charts";
import {ChartType} from "chart.js";
import {StatisticService} from "../statistic.service";
import {skipWhile} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentSeasonId: number;
  stats: [];
  public doughnutChartData: SingleDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';
  public donughtColors: any = [
    {
      backgroundColor: "#4E546C"
    }
  ];
  constructor(
    private store: Store<AppState>,
    private statisticService: StatisticService
  ) { }

  ngOnInit() {
    this.store
      .pipe(
        select(selectCurrentSeasonId),
        skipWhile(seasonId => seasonId < 0)
      ).subscribe(seasonId => {
        this.currentSeasonId = seasonId;
        this.statisticService.getBasicStatistics(seasonId).subscribe(
          stats => {
            this.doughnutChartData.push(stats.teamsInSeason);
          }
        );
      });
  }

}
