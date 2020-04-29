import { Component, OnInit } from '@angular/core';
import {AppState} from "../reducers";
import {select, Store} from "@ngrx/store";
import {Team} from "../models/team";
import {loadTeams} from "../team/team.actions";
import {selectDeletedTeams, selectOnlyNonDeletedTeams} from "../team/team.selectors";
import {Observable} from "rxjs";

@Component({
  selector: 'app-all-teams-listing',
  templateUrl: './all-teams-listing.component.html',
  styleUrls: ['./all-teams-listing.component.scss']
})
export class AllTeamsListingComponent implements OnInit {
  activeTeams$: Observable<Team[]>;
  deletedTeams$: Observable<Team[]>;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(loadTeams());
    this.activeTeams$ = this.store.pipe(
      select(selectOnlyNonDeletedTeams)
    );
    this.deletedTeams$ = this.store.pipe(
      select(selectDeletedTeams)
    );
  }

}
