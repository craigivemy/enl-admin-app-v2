import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {ApiRoutes} from '../data/api-routes';
import {Observable} from 'rxjs';
import {Team} from './models/team';
import {map, tap} from 'rxjs/operators';
import {Player} from './models/player';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  teamsApiUrl = environment.baseApiUrl + ApiRoutes.Teams;
  playersApiUrl = environment.baseApiUrl + ApiRoutes.Players;
  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get(this.teamsApiUrl)
      .pipe(
        map(teams => teams["data"])
      );
  }

  getTeamById(teamId: number): Observable<Team> {
    return this.http.get(`${this.teamsApiUrl}/${teamId}`)
      .pipe(
        map(team => team["data"])
      );
  }

  getPlayersByTeamId(teamId: number): Observable<Player[]> {
    return this.http.get(`${this.playersApiUrl}?teamId=${teamId}`)
      .pipe(
        map(players => players["data"])
      );
  }

  addPlayer(player: Player): Observable<Player> {
    return this.http.post(`${this.playersApiUrl}`, {player})
      .pipe(
        map(newPlayer => newPlayer["data"])
      );
  }

  updatePlayer(changes: Partial<Player>, playerId: number): Observable<Player> {
    return this.http.put(`${this.playersApiUrl}/${playerId}`, {player: changes, id: playerId})
      .pipe(
        tap(val => console.log(val)),
        map(updatedPlayer => updatedPlayer["data"])
      );
  }

}
