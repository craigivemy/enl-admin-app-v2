import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {ApiRoutes} from '../data/api-routes';
import {Fixture} from './models/fixture';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FixtureService {

  fixturesApiUrl = environment.baseApiUrl + ApiRoutes.Fixtures;
  constructor(
    private http: HttpClient
  ) { }

  getFixtures(): Observable<Fixture[]> {
    return this.http.get(this.fixturesApiUrl).pipe(
      map(fixtures => fixtures["data"])
    );
  }

}
