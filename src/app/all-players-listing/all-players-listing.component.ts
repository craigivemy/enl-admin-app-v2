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

@Component({
  selector: 'app-all-players-listing',
  templateUrl: './all-players-listing.component.html',
  styleUrls: ['./all-players-listing.component.scss']
})
export class AllPlayersListingComponent implements OnInit {
  teams$: Observable<Team[]>;
  selectedPlayers: [];
  selectedTeamId: number;
  seasonId: number;
  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.store.pipe(select(selectCurrentSeasonId))
      .subscribe(seasonId => {
        this.seasonId = seasonId;
        this.store.dispatch(loadTeams({seasonId}));
        // todo - all or just active?
        this.teams$ = this.store.pipe(
          select(selectActiveTeams)
        );
      });
  }

  updateSelectedTeamId(teamId: number) {
    this.selectedTeamId = teamId;
  }

  deletePlayers() {
    this.teamService.deletePlayersFromTeam(this.selectedTeamId, this.selectedPlayers, this.seasonId).subscribe(updates => {
        const updatedTeam: Update<Team> = {
          id: this.selectedTeamId,
          changes: updates
        };
        this.store.dispatch(updateTeam({team: updatedTeam}));
      }
    );
  }
}
