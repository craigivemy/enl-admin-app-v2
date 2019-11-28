import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Season} from "./models/season";
import {environment} from "../environments/environment";
import {ApiRoutes} from "../data/api-routes";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SeasonService {
  seasonsApiUrl = environment.baseApiUrl + ApiRoutes.Seasons;
  constructor(private http: HttpClient) { }

  getSeasons(): Observable<Season[]> {
    return this.http.get(this.seasonsApiUrl)
      .pipe(
        map(seasons => seasons["data"])
      );
  }

  save(season: Season, divisionsTeams: any): Observable<Season> {
    return this.http.post(`${this.seasonsApiUrl}`, {
      season,
      divisionsTeams
    })
      .pipe(
        tap(response => console.log(response)),
        map(seasonResponse => seasonResponse["data"])
      );
  }


}
