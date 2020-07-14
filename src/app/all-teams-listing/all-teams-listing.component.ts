import {Component, OnInit, ViewChild} from '@angular/core';
import {AppState} from "../reducers";
import {select, Store} from "@ngrx/store";
import {Team} from "../models/team";
import {loadTeams} from "../team/team.actions";
import {selectDeletedTeams, selectOnlyNonDeletedTeams} from "../team/team.selectors";
import {Observable} from "rxjs";
import {TeamService} from "../team.service";
import {MatDialog} from "@angular/material";
import {TeamDialogComponent} from "../team-dialog/team-dialog.component";

@Component({
  selector: 'app-all-teams-listing',
  templateUrl: './all-teams-listing.component.html',
  styleUrls: ['./all-teams-listing.component.scss']
})
export class AllTeamsListingComponent implements OnInit {
  activeTeams$: Observable<Team[]>;
  deletedTeams$: Observable<Team[]>;
  selectedActiveTeams = [];
  selectedDeletedTeams = [];
  constructor(
    private store: Store<AppState>,
    private teamService: TeamService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.store.dispatch(loadTeams());
    this.activeTeams$ = this.store.pipe(
      select(selectOnlyNonDeletedTeams)
    );
    this.deletedTeams$ = this.store.pipe(
      select(selectDeletedTeams)
    );
  }

  addTeam() {
    const dialogRef = this.dialog.open(TeamDialogComponent, {
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
