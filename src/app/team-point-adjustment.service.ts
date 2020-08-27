import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {ApiRoutes} from "../data/api-routes";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TeamPointAdjustment} from "./models/teamPointAdjustment";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TeamPointAdjustmentService {
  teamPointAdjustmentsUrl = environment.baseApiUrl + ApiRoutes.Teams;
  constructor(
    private http: HttpClient
  ) { }

  getTeamPointAdjustment(teamId: number, seasonId: number): Observable<TeamPointAdjustment[]> {
    return this.http.get(`${this.teamPointAdjustmentsUrl}/${teamId}?pointAdjustments=1&seasonId=${seasonId}`)
      .pipe(
        map(teamPointAdjustment => teamPointAdjustment["data"])
      );
  }

  // not using store
  updateTeamPointAdjustments(teamId: number, seasonId: number, values: any) {
    return this.http.put(`${this.teamPointAdjustmentsUrl}/${teamId}?teamPointAdjustments=1&seasonId=${seasonId}`, {
      seasonId,
      adjustments: values
    })
      .pipe(
        tap(data => console.log(data)),
        map(data => data)
      );
  }

}
