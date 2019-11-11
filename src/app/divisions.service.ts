import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Division} from './models/division';
import { ApiRoutes} from '../data/api-routes';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DivisionsService {
  divisionsApiUrl: ApiRoutes.Divisions;
  constructor(private http: HttpClient) { }

  getDivisions(): Observable<Division[]> {
    return this.http.get(this.divisionsApiUrl)
      .pipe(
        map(divisions => divisions["data"])
      );
  }

}
