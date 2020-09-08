import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {ApiRoutes} from '../data/api-routes';
import {Observable, of} from 'rxjs';
import {Team} from './models/team';
import {map, tap} from 'rxjs/operators';
import {Player} from './models/player';
import {PlayedUp} from "./models/playedUp";

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

  getPlayersByTeamId(teamId: number, seasonId: number): Observable<Player[]> {
    return this.http.get(`${this.playersApiUrl}?teamId=${teamId}&seasonId=${seasonId}`)
      .pipe(
        tap(() => console.log(`${this.playersApiUrl}?teamId=${teamId}&seasonId=${seasonId}`)),
        map(players => players["data"])
      );
  }

  getPlayedUpPlayers(seasonId: number): Observable<Player[]> {
    return this.http.get(`${this.playersApiUrl}?seasonId=${seasonId}`)
      .pipe(
        map(players => players["data"])
      );
  }

  addTeam(team: Team): Observable<Team> {
    return this.http.post(`${this.teamsApiUrl}`, {team})
      .pipe(
        map(newTeam => newTeam["data"])
      );
  }

  addPlayer(player: Player, teamId: number, seasonId: number): Observable<Player> {
    return this.http.post(`${this.playersApiUrl}`, {player, teamId, seasonId})
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

  updateTeam(changes: Partial<Team>, teamId: number): Observable<Team> {
    return this.http.put(`${this.teamsApiUrl}/${teamId}`, {changes})
      .pipe(
        map(updatedTeam => updatedTeam["data"])
      );
  }

  addPlayedUp(playedUpDate: any, playerId: number, seasonId: number) {
    return this.http.put(`${this.playersApiUrl}/${playerId}?addPlayedUp=1`, {playedUpDate, id: playerId, seasonId}).pipe(
      tap(player => console.log(player["data"])),
      map(updatedPlayer => updatedPlayer["data"])
    );
  }

  removePlayedUp(id: number, playerId: number, seasonId: number) {
    return this.http.put(`${this.playersApiUrl}/${playerId}?deletePlayedUp=1`, {playedUpId: id, playerId, seasonId}).pipe(
      tap(val => console.log(val)),
      map(updatedPlayer => updatedPlayer["data"])
    );
  }

  batchDeleteTeams($ids: number[]) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        ids: $ids
      },
    };
    return this.http.delete(`${environment.baseApiUrl}batch/teams`, options)
      .pipe(
        tap((q) => console.log(123))
      );
  }

  batchRestoreTeams($ids: number[]) {
    return this.http.post(`${environment.baseApiUrl}batchRestore/teams`, {ids: $ids});
  }

}
