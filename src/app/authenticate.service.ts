import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";
import {ApiRoutes} from "../data/api-routes";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  loginUrl = environment.baseApiUrl + ApiRoutes.Authenticate;
  constructor(
    private http: HttpClient
  ) { }

  login(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    return this.http.post(`${this.loginUrl}`,
      data, options);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

}
