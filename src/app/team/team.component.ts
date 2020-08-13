import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Team} from '../models/team';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {Player} from '../models/player';
import {addPlayer, loadPlayersFromTeam, updatePlayer} from './team.actions';
import {selectIfPlayersLoading, selectPlayers, selectPlayersByTeamId} from './team.selectors';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {TeamService} from '../team.service';
import {Observable} from 'rxjs';
import {Update} from '@ngrx/entity';
import {selectCurrentSeasonId} from "../season/season.selectors";
import {PlayedUpDialogComponent} from "../played-up-dialog/played-up-dialog.component";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  team: Team;
  selection = new SelectionModel<Player>(true, []);
  columnsToDisplay = ['select', 'forename', 'surname', 'playedUpCount'];
  footerColumnsToDisplay = ['select', 'forename', 'surname', 'playedUpCount'];
  dataSource;
  newPlayer = new Player();
  playersLoading: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private teamService: TeamService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.store
      .pipe(
        select(selectCurrentSeasonId)
      ).subscribe(seasonId => {
      this.route.data.subscribe(
        (data: { team: Team }) => {
          this.team = data.team;
          this.store.dispatch(loadPlayersFromTeam({teamId: data.team.id, seasonId}));
          this.store.pipe(select(selectPlayers)).subscribe(players => this.dataSource = new MatTableDataSource(players));
          this.playersLoading = this.store.pipe(select(selectIfPlayersLoading));
        }
      );
    });
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

  addPlayer() {
    // todo this also needs to be adjusted maybe just backend though
    if (Object.keys(this.newPlayer).length
      && this.newPlayer.forename
      && this.newPlayer.forename.trim().length > 2
      && this.newPlayer.surname
      && this.newPlayer.surname.trim().length > 2) {
      const player = {
        forename:  this.newPlayer.forename.trim(),
        surname: this.newPlayer.surname.trim(),
        playedUpCount: 0,
        playedUps: [],
        teamId: this.team.id
      };
      this.teamService.addPlayer(player)
        .subscribe(newPlayer => {
          this.store.dispatch(addPlayer({player: newPlayer}));
          this.newPlayer = new Player();
        });
    }
  }

  playedUpSignals(count: number) {
    switch (count) {
      case 0:
      case 1:
        return 'primary';
      case 2:
        return 'accent';
      default:
        return 'warn';
    }
  }

  updatePlayedUpCount(player: Player) {
    const dialogRef = this.dialog.open(PlayedUpDialogComponent, {
      data: {player}
    });

    // let changes;
    // this.teamService.updatePlayer(changes, player.id).subscribe(
    //   () => {
    //     const updatedPlayer: Update<Player> = {
    //       id: player.id,
    //       changes
    //     };
    //     this.store.dispatch(updatePlayer({player: updatedPlayer}));
    //   }
    // );
  }

}



