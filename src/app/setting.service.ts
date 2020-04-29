import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {ApiRoutes} from '../data/api-routes';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Setting} from './models/setting';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  settingsApiUrl = environment.baseApiUrl + ApiRoutes.Settings;
  constructor(private http: HttpClient) { }

  getSettings(seasonId?: number): Observable<Setting[]> {
    if (seasonId) {
      return this.http.get(`${this.settingsApiUrl}/?${seasonId}`)
        .pipe(
          map(settings => settings["data"])
        );
    }
    return this.http.get(`${this.settingsApiUrl}`)
      .pipe(
        tap(data => console.log(data)),
        map(settings => settings["data"])
      );
  }
}
