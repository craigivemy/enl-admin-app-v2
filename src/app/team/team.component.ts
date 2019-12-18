import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Team} from '../models/team';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {Player} from '../models/player';
import {addPlayer, loadPlayersFromTeam} from './team.actions';
import {selectIfPlayersLoading, selectPlayers, selectPlayersByTeamId} from './team.selectors';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {TeamService} from '../team.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  team: Team;
  selection = new SelectionModel<Player>(true, []);
  columnsToDisplay = ['select', 'forename', 'surname'];
  footerColumnsToDisplay = ['select', 'forename', 'surname'];
  dataSource;
  newPlayer = new Player();
  playersLoading: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { team: Team }) => {
        this.team = data.team;
        this.store.dispatch(loadPlayersFromTeam({teamId: data.team.id}));
        this.store.pipe(select(selectPlayers)).subscribe(players => this.dataSource = new MatTableDataSource(players));
        this.playersLoading = this.store.pipe(select(selectIfPlayersLoading));
      }
    );
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  selectedCount(): string {
    const count = this.selection.selected.length;
    if (count) {
      return count === 1 ? `1 team selected` : `${count} teams selected`;
    }
  }

  test() {
    const player = {forename:  this.newPlayer.forename, surname: this.newPlayer.surname, playedUpCount: 0, teamId: this.team.id};
    this.teamService.addPlayer(player)
      .subscribe(newPlayer => {
        this.store.dispatch(addPlayer({player: newPlayer}));
        this.newPlayer = new Player();
      });
  }
}



