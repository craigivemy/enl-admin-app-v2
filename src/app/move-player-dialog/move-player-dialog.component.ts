import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {selectCurrentSeasonId} from "../season/season.selectors";
import {loadTeams, updateTeam} from "../team/team.actions";
import {Observable} from "rxjs";
import {Team} from "../models/team";
import {selectActiveTeams, selectAllTeams} from "../team/team.selectors";
import {TeamService} from "../team.service";
import {Update} from "@ngrx/entity";
import {MessengerService} from "../messenger.service";

@Component({
  selector: 'app-move-player-dialog',
  templateUrl: './move-player-dialog.component.html',
  styleUrls: ['./move-player-dialog.component.scss']
})
export class MovePlayerDialogComponent implements OnInit {
  seasonId: number;
  teams$: Observable<Team[]>;
  fromTeamName: string;
  fromTeamId: number;
  playerIds: number[];
  newTeam;
  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<MovePlayerDialogComponent>,
    private teamService: TeamService,
    private messengerService: MessengerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fromTeamName = this.data.teamName;
    this.fromTeamId = this.data.teamId;
    this.playerIds = this.data.playerIds;
  }

  ngOnInit() {
    this.store.pipe(
      select(selectCurrentSeasonId)
    ).subscribe(seasonId => {
      this.seasonId = seasonId;
      this.store.dispatch(loadTeams({seasonId}));
      this.teams$ = this.store.pipe(
        // todo - compare this to activeTeams
        select(selectActiveTeams)
      );
    });
  }

  passBackNewTeam(team: Team) {
    this.dialogRef.close(team);
  }

  movePlayers(team: Team) {
    this.teamService.movePlayers(this.fromTeamId, this.playerIds, this.seasonId, team.id)
      .subscribe(
        bothTeams => {
          const updatedFromTeam: Update<Team> = {
            id: this.fromTeamId,
            changes: bothTeams.fromTeam
          };
          const updatedToTeam: Update<Team> = {
            id: team.id,
            changes: bothTeams.toTeam
          };
          this.store.dispatch(updateTeam({team: updatedFromTeam}));
          this.store.dispatch(updateTeam({team: updatedToTeam}));
          this.messengerService.sendMessage('Player(s) Successfully Moved');
          this.dialogRef.close(1);
        },
        err => {
          this.messengerService.sendMessage('Oops! Something went wrong, please try again', 500, 5000);
          this.dialogRef.close(0);
        }
      );
  }

}
