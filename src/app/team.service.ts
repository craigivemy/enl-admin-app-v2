import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {ApiRoutes} from '../data/api-routes';
import {Observable} from 'rxjs';
import {Team} from './models/team';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  teamsApiUrl = environment.baseApiUrl + ApiRoutes.Teams;
  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get(this.teamsApiUrl)
      .pipe(
        map(teams => teams["data"])
      );
  }
}
