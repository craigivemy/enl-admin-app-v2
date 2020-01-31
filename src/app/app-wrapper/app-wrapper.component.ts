import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {SeasonService} from "../season.service";
import {loadSeasons} from "../season/season.actions";
import {Season} from "../models/season";
import {selectAllSeasons} from "../season/season.selectors";

@Component({
  selector: 'app-app-wrapper',
  templateUrl: './app-wrapper.component.html',
  styleUrls: ['./app-wrapper.component.scss']
})
export class AppWrapperComponent implements OnInit {
seasons$: Observable<Season[]>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private seasonService: SeasonService,
    private store: Store<AppState>
  ) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
    this.store.dispatch(loadSeasons());
    this.seasons$ = this.store.pipe(select(selectAllSeasons));
  }

}
