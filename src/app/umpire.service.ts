import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {ApiRoutes} from "../data/api-routes";
import {Umpire} from "./models/umpire";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UmpireService {
  umpiresApiUrl = environment.baseApiUrl + ApiRoutes.Umpires;
  constructor(
    private http: HttpClient
  ) { }

  getUmpires(): Observable<Umpire[]> {
    return this.http.get(`${this.umpiresApiUrl}`)
      .pipe(
        map(umpires => umpires["data"])
      );
  }

  updateUmpire(changes: Partial<Umpire>, id: number) {
    return this.http.put(`${this.umpiresApiUrl}/${id}`, {umpire: changes})
      .pipe(
        map(updatedUmpire => updatedUmpire["data"])
    );
  }

  addUmpire(umpire: Umpire): Observable<Umpire> {
    return this.http.post(this.umpiresApiUrl, {umpire})
      .pipe(
        map(newUmpire => newUmpire["data"])
      );
  }

  deleteUmpire(id: number) {
    return this.http.delete(`${this.umpiresApiUrl}/${id}/soft`);
  }

}
