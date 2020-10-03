import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AppState} from "../reducers";
import {Player} from "../models/player";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {selectActiveTeams} from "../team/team.selectors";
import {loadTeams, updateTeam} from "../team/team.actions";
import {selectCurrentSeasonId} from "../season/season.selectors";
import {Team} from "../models/team";
import {MatDialog, MatSnackBar} from "@angular/material";
import {TeamService} from "../team.service";
import {Update} from "@ngrx/entity";
import {ConfirmDeleteComponent} from "../confirm-delete/confirm-delete.component";
import {MessengerService} from "../messenger.service";
import {MovePlayerDialogComponent} from "../move-player-dialog/move-player-dialog.component";
import {AddPlayerDialogComponent} from "../add-player-dialog/add-player-dialog.component";
import {PageTitleService} from "../page-title.service";

@Component({
  selector: 'app-all-players-listing',
  templateUrl: './all-players-listing.component.html',
  styleUrls: ['./all-players-listing.component.scss']
})
export class AllPlayersListingComponent implements OnInit {
  teams$: Observable<Team[]>;
  selectedPlayers: [];
  selectedTeamId: number;
  selectedTeamName: string;
  seasonId: number;
  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private teamService: TeamService,
    public messengerService: MessengerService,
    private pageTitleService: PageTitleService
  ) {
    pageTitleService.title.next('Players');
  }

  ngOnInit() {
    this.store.pipe(select(selectCurrentSeasonId))
      .subscribe(seasonId => {
        this.seasonId = seasonId;
        this.store.dispatch(loadTeams({seasonId}));
        this.teams$ = this.store.pipe(
          select(selectActiveTeams)
        );
      });
  }

  updateSelectedTeamId(team: Team) {
    if (team) {
      this.selectedTeamId = team.id;
      this.selectedTeamName = team.name;
    }
  }

  deletePlayers() {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.teamService.deletePlayersFromTeam(this.selectedTeamId, this.selectedPlayers, this.seasonId).subscribe(updates => {
            const updatedTeam: Update<Team> = {
              id: this.selectedTeamId,
              changes: updates
            };
            this.store.dispatch(updateTeam({team: updatedTeam}));
            this.selectedPlayers = [];
            this.messengerService.sendMessage('Successfully removed from season');
          }
        );
      } else {
        dialogRef.close();
      }
    });
  }

  movePlayers() {
    const dialogRef = this.dialog.open(MovePlayerDialogComponent, {
      data: {teamName: this.selectedTeamName, teamId: this.selectedTeamId, playerIds: this.selectedPlayers}
    });
    dialogRef.afterClosed().subscribe(
      () => this.selectedPlayers = []
    );
  }

  addPlayer(team) {
    this.selectedPlayers = [];
    const dialogRef = this.dialog.open(AddPlayerDialogComponent, {
      data: {team}
    });
  }

}
