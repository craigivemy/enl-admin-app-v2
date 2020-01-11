import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {ApiRoutes} from "../data/api-routes";
import {Table} from "./models/table";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  tablesApiUrl = environment.baseApiUrl + ApiRoutes.Tables;
  constructor(private http: HttpClient) { }

  getTables(seasonId: number): Observable<Table[]> {
    return this.http.get(`${this.tablesApiUrl}?seasonId=${seasonId}`)
      .pipe(
        map(tables => tables["data"])
      );
  }

}
