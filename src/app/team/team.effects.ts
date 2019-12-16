import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {TeamService} from '../team.service';
import * as TeamActions from './team.actions';
import {map, mergeMap, tap} from 'rxjs/operators';



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
  loadPlayers = createEffect(() => this.actions$.pipe(
    ofType(TeamActions.loadPlayersFromTeam),
    mergeMap(action => this.teamService.getPlayersByTeamId(action.teamId)),
    map(players => TeamActions.loadPlayersSuccess({players}))
  ));

}