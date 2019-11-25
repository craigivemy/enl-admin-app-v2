import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {ApiRoutes} from '../data/api-routes';
import {Fixture} from './models/fixture';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {FixtureCollection} from './models/fixture-collection';

@Injectable({
  providedIn: 'root'
})
export class FixtureService {

  fixturesApiUrl = environment.baseApiUrl + ApiRoutes.Fixtures;
  constructor(
    private http: HttpClient
  ) { }

  getFixtures(seasonId: number): Observable<FixtureCollection[]> {
    return this.http.get<FixtureCollection[]>(`${this.fixturesApiUrl}?seasonId=${seasonId}`)
      .pipe(
        tap(data => console.log(data)),
        map(fixtures => fixtures["data"])
      );
  }

}
