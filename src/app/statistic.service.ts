import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {ApiRoutes} from "../data/api-routes";
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  statisticsApiUrl = environment.baseApiUrl + ApiRoutes.Statistics;
  constructor(
    private http: HttpClient
  ) { }

  getBasicStatistics(seasonId: number) {
    return this.http.get(`${this.statisticsApiUrl}?seasonId=${seasonId}&basicStats=1`)
      .pipe(
        tap(data => console.log(data)),
        map(stats => stats["data"])
      );
  }
}
