import { Component, OnInit } from '@angular/core';
import {AppState} from "../reducers";
import {select, Store} from "@ngrx/store";
import {Team} from "../models/team";
import {loadTeams} from "../team/team.actions";
import {selectAllTeams} from "../team/team.selectors";
import {Observable} from "rxjs";

@Component({
  selector: 'app-all-teams-listing',
  templateUrl: './all-teams-listing.component.html',
  styleUrls: ['./all-teams-listing.component.scss']
})
export class AllTeamsListingComponent implements OnInit {
  teams$: Observable<Team[]>;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(loadTeams());
    this.teams$ = this.store.pipe(
      select(selectAllTeams)
    );
  }

}
