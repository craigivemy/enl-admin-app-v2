import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {selectCurrentSeasonId} from "../season/season.selectors";
import {concat, Observable, of} from "rxjs";
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
  nextMatchDate;
  missingResultsFromLastSevenDays;
  teamsInSeason;
  roundsInSeason;
  goalsInSeason;
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartLabels: Label[] = ['Played Up Once', 'Played Up Twice', 'Played Up More Than Twice'];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutColors: any = [
    {
      backgroundColor: ['#2DD1AC', '#4E546C', '#ef5350']
    }
  ];
  public doughnutOptions: any = {
    legend: {
      position: 'bottom',
    },
    labels: {
      boxWidth: '15'
    }
  };
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
            this.doughnutChartData.push([stats.playedUpStats.once]);
            this.doughnutChartData.push([stats.playedUpStats.twice]);
            this.doughnutChartData.push([stats.playedUpStats.moreThanTwice]);
            this.nextMatchDate = stats.nextMatchAndDatetime;
            this.missingResultsFromLastSevenDays = stats.missingResultsFromLastSevenDays;
            this.goalsInSeason = stats.goalsInSeason;
            this.teamsInSeason = stats.teamsInSeason;
            this.roundsInSeason = stats.roundsInSeason;
          }
        );
      });

  }

}
