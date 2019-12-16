import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Team} from '../models/team';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {Observable} from 'rxjs';
import {Player} from '../models/player';
import {loadPlayersFromTeam} from './team.actions';
import {selectPlayers} from './team.selectors';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  team: Team;
  players$: Observable<Player[]>;
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { team: Team }) => {
        this.team = data.team;
        this.store.dispatch(loadPlayersFromTeam({teamId: data.team.id}));
        this.players$ = this.store.pipe(select(selectPlayers));
      }
    );
  }

}
