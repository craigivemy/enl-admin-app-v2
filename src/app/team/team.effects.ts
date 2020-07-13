import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {TeamService} from '../team.service';
import * as TeamActions from './team.actions';
import {filter, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {selectIfAllTablesLoaded} from "../tables/table.selectors";
import {selectIfAllTeamsLoaded} from "./team.selectors";



@Injectable()
export class TeamEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private teamService: TeamService
    ) {}

    loadTeam$ = createEffect(() => this.actions$.pipe(
      ofType(TeamActions.loadTeam),
      mergeMap(action => this.teamService.getTeamById(action.teamId)),
      map(team => TeamActions.loadTeamSuccess({team}))
    ));

  // todo - necessary to make another call here - or just get players from above call?
  loadPlayers$ = createEffect(() => this.actions$.pipe(
    ofType(TeamActions.loadPlayersFromTeam),
    mergeMap(action => this.teamService.getPlayersByTeamId(action.teamId)),
    map(players => TeamActions.loadPlayersSuccess({players}))
  ));

  loadPlayedUpPlayers = createEffect(() => this.actions$.pipe(
    ofType(TeamActions.loadAllPlayedUpPlayers),
    mergeMap(() =>
      this.teamService.getPlayedUpPlayers().pipe(
        map(players => TeamActions.loadAllPlayedUpPlayersSuccess({players}))
      )),
  ));

  // todo - makes the call eveb when they are all ready loaded at the moment
  loadTeams$ = createEffect(() => this.actions$.pipe(
    ofType(TeamActions.loadTeams),
    withLatestFrom(this.store.pipe(select(selectIfAllTeamsLoaded))),
    filter(([action, allTeamsLoaded]) => !allTeamsLoaded),
    mergeMap(() =>
      this.teamService.getTeams().pipe(
        map(teams => TeamActions.loadTeamsSuccess({teams}))
      )),
  ));
}
