import {Component, OnInit, ViewChild} from '@angular/core';
import {AppState} from "../reducers";
import {select, Store} from "@ngrx/store";
import {Team} from "../models/team";
import {deleteTeam, loadTeams} from "../team/team.actions";
import {
  selectActiveTeams,
  selectDeletedTeams,
  selectInactiveTeams,
  selectOnlyNonDeletedTeams
} from "../team/team.selectors";
import {Observable} from "rxjs";
import {TeamService} from "../team.service";
import {MatDialog} from "@angular/material";
import {TeamDialogComponent} from "../team-dialog/team-dialog.component";
import {tap} from "rxjs/operators";
import {selectCurrentSeasonId} from "../season/season.selectors";
import {EditTeamDialogComponent} from "../edit-team-dialog/edit-team-dialog.component";
import {ConfirmDeleteComponent} from "../confirm-delete/confirm-delete.component";
import {MessengerService} from "../messenger.service";

@Component({
  selector: 'app-all-teams-listing',
  templateUrl: './all-teams-listing.component.html',
  styleUrls: ['./all-teams-listing.component.scss']
})
export class AllTeamsListingComponent implements OnInit {
  activeTeams$: Observable<Team[]>;
  deletedTeams$: Observable<Team[]>;
  inactiveTeams$: Observable<Team[]>;
  selectedActiveTeams = [];
  selectedDeletedTeams = [];
  teamsPath = '/teams';
  constructor(
    private store: Store<AppState>,
    private teamService: TeamService,
    private messengerService: MessengerService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.store.pipe(select(selectCurrentSeasonId))
      .subscribe(seasonId => {
        this.store.dispatch(loadTeams({seasonId}));
        this.activeTeams$ = this.store.pipe(
          select(selectActiveTeams),
          tap(teams => {
            teams.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              } else {
                return -1;
              }
            });
          })
        );
        this.inactiveTeams$ = this.store.pipe(
          select(selectInactiveTeams),
          tap(teams => {
            teams.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              } else {
                return -1;
              }
            });
          })
        );
        this.deletedTeams$ = this.store.pipe(
          select(selectDeletedTeams),
          tap(teams => {
            teams.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              } else {
                return -1;
              }
            });
          })
        );
      });
  }

  addTeam() {
    const dialogRef = this.dialog.open(TeamDialogComponent, {
      panelClass: 'wide-dialog'
    });
  }

  deleteTeam(id: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.teamService.batchDeleteTeams([id]).subscribe(
          () => {
            this.store.dispatch(deleteTeam({id}));
            this.messengerService.sendMessage('Umpire Deleted', 1000);
          }
        );
      } else {
        dialogRef.close();
      }
    });
  }

  openEditDialog(team: Team) {
    const dialogRef = this.dialog.open(EditTeamDialogComponent, {
      data: {id: team.id, needsReload: false},
      panelClass: 'wide-dialog'
    });
  }

  deleteTeams() {
    this.teamService.batchDeleteTeams(this.selectedActiveTeams).subscribe(
      () => this.reloadPage()
    );
  }
  reloadPage() {
    window.location.reload();
  }
  restoreTeams() {
    this.teamService.batchRestoreTeams(this.selectedDeletedTeams).subscribe(
      () => this.reloadPage()
    );
  }

}
