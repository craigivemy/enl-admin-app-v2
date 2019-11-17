import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {selectCurrentSeasonId} from "../season/season.selector";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentSeasonId: Observable<number>;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.currentSeasonId = this.store
      .pipe(
        select(selectCurrentSeasonId)
      );
  }

}
