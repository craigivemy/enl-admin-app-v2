import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {ApiRoutes} from '../data/api-routes';
import {Match} from './models/match';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  matchesApiUrl = environment.baseApiUrl + ApiRoutes.Matches;
  constructor(
    private http: HttpClient
  ) { }

  getFixtures(seasonId: number): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.matchesApiUrl}?seasonId=${seasonId}`)
      .pipe(
        map(matches => matches["data"])
      );
  }

  saveMatch(matchId: number, changes: Partial<Match>) {
    return this.http.put(`${this.matchesApiUrl}/${matchId}`, changes);
  }

}
