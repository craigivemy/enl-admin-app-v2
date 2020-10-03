import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";
import {ApiRoutes} from "../data/api-routes";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "./models/user";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  loginUrl = environment.baseApiUrl + ApiRoutes.Authenticate;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    return this.http.post(`${this.loginUrl}`,
      data, options).pipe(
        map((user: any) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }


}
