import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Division} from './models/division';
import { ApiRoutes} from '../data/api-routes';
import {map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Season} from "./models/season";

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  divisionsApiUrl = environment.baseApiUrl + ApiRoutes.Divisions;
  constructor(private http: HttpClient) { }

  // todo - need another method for just getting divisions not with teams, or rather change below to say we want teams too
  getDivisions(): Observable<Division[]> {
    return this.http.get(this.divisionsApiUrl)
      .pipe(
        map(divisions => divisions["data"])
      );
  }

  getDivisionsWithTeams(seasonId: number): Observable<Division[]> {
    return this.http.get(`${this.divisionsApiUrl}?seasonId=${seasonId}`)
      .pipe(
        tap(val => console.log(`${this.divisionsApiUrl}?seasonId=${seasonId}`)),
        map(divisionsWithTeams => divisionsWithTeams["data"])
      );
  }
}
