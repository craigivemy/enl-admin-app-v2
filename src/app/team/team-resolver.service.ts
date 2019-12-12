import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Team} from '../models/team';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {Observable} from 'rxjs';
import {selectTeamById} from './team.selectors';
import {filter, first, map, tap} from 'rxjs/operators';
import {loadTeam} from './team.actions';

@Injectable({
  providedIn: 'root'
})
export class TeamResolverService implements Resolve<Team> {

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Team> | Promise<Team> | Team {
    const teamId = parseInt(route.paramMap.get('id'));
    return this.store.pipe(
      select(selectTeamById(teamId)),
      tap(team => {
        if (!team) {
          console.log(teamId);
          this.store.dispatch(loadTeam({teamId}));
        }
      }),
      filter(team => !!team),
      first()
    );
  }

}
