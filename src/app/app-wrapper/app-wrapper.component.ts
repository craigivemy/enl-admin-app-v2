import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import {map, shareReplay, tap} from 'rxjs/operators';
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {SeasonService} from "../season.service";
import {loadSeasons} from "../season/season.actions";
import {Season} from "../models/season";
import {selectAllSeasons} from "../season/season.selectors";
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-app-wrapper',
  templateUrl: './app-wrapper.component.html',
  styleUrls: ['./app-wrapper.component.scss']
})
export class AppWrapperComponent implements OnInit {
seasons$: Observable<Season[]>;
displayTitle: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private seasonService: SeasonService,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
    this.store.dispatch(loadSeasons());
    this.seasons$ = this.store.pipe(select(selectAllSeasons));
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.displayTitle = this.route.root.firstChild.snapshot.data["displayTitle"];
      }
    });
  }

}
