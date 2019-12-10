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
export class FixtureService {

  fixturesApiUrl = environment.baseApiUrl + ApiRoutes.Fixtures;
  constructor(
    private http: HttpClient
  ) { }

  getFixtures(seasonId: number): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.fixturesApiUrl}?seasonId=${seasonId}`)
      .pipe(
        map(fixtures => fixtures["data"])
      );
  }

}
