import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Division} from './models/division';
import { ApiRoutes} from '../data/api-routes';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Season} from "./models/season";

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  divisionsApiUrl = environment.baseApiUrl + ApiRoutes.Divisions;
  constructor(private http: HttpClient) { }

  getDivisions(): Observable<Division[]> {
    return this.http.get(this.divisionsApiUrl)
      .pipe(
        map(divisions => divisions["data"])
      );
  }
}
