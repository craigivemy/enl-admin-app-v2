import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppMaterialModule} from './app-material.module';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AppWrapperComponent } from './app-wrapper/app-wrapper.component';
import { HomeComponent } from './home/home.component';
import { NewSeasonComponent } from './new-season/new-season.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { SeasonEffects } from './season/season.effects';
import * as fromSeason from './season/season.reducer';
import * as fromDivision from './division/division.reducer';
import { DivisionsTeamsListingComponent } from './divisions-teams-listing/divisions-teams-listing.component';
import { PlayedUpComponent } from './played-up/played-up.component';
import { DivisionEffects } from './division/division.effects';
import { AllTeamsListingComponent } from './all-teams-listing/all-teams-listing.component';
import { AllPlayersListingComponent } from './all-players-listing/all-players-listing.component';
import { TablesComponent } from './tables/tables.component';
import { FixtureListingComponent } from './fixture-listing/fixture-listing.component';
import { ResultListingComponent } from './result-listing/result-listing.component';
import { FixtureComponent } from './match/fixture.component';
import { MatchEffects } from './match/match.effects';
import * as fromMatch from './match/match.reducer';
import localeGb from '@angular/common/locales/en-GB';
import {registerLocaleData} from '@angular/common';
import { MatchDialogComponent } from './match-dialog/match-dialog.component';
import { TeamComponent } from './team/team.component';
import * as fromTeam from './team/team.reducer';
import { TeamEffects } from './team/team.effects';
import * as fromPlayer from './team/player.reducer';
import * as fromTable from './tables/table.reducer';
import * as fromUmpire from './umpire-listing/umpire.reducer';
import { TableEffects } from './tables/table.effects';
import { TeamDialogComponent } from './team-dialog/team-dialog.component';
import { PlayedUpDialogComponent } from './played-up-dialog/played-up-dialog.component';
import { PlayedUpBottomsheetComponent } from './played-up-bottomsheet/played-up-bottomsheet.component';
import { DeductPointsComponent } from './deduct-points/deduct-points.component';
import { DeductPointsDialogComponent } from './deduct-points-dialog/deduct-points-dialog.component';
import {ChartsModule, ThemeService} from "ng2-charts";
import {Ng2OdometerModule} from "ng2-odometer";
import { EditTeamDialogComponent } from './edit-team-dialog/edit-team-dialog.component';
import { UmpireListingComponent } from './umpire-listing/umpire-listing.component';
import { UmpireEffects } from './umpire-listing/umpire.effects';
import { EditUmpireDialogComponent } from './edit-umpire-dialog/edit-umpire-dialog.component';
import { AddUmpireDialogComponent } from './add-umpire-dialog/add-umpire-dialog.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { EditFixtureDialogComponent } from './edit-fixture-dialog/edit-fixture-dialog.component';
import { MovePlayerDialogComponent } from './move-player-dialog/move-player-dialog.component';
import { AddPlayerDialogComponent } from './add-player-dialog/add-player-dialog.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import {JwtModule} from "@auth0/angular-jwt";
import {JwtInterceptor} from "./_helpers/jwt.interceptor";
import {ErrorInterceptor} from "./_helpers/error.interceptor";
registerLocaleData(localeGb);

@NgModule({
  declarations: [
    AppComponent,
    AppWrapperComponent,
    HomeComponent,
    NewSeasonComponent,
    DivisionsTeamsListingComponent,
    PlayedUpComponent,
    AllTeamsListingComponent,
    AllPlayersListingComponent,
    TablesComponent,
    FixtureListingComponent,
    ResultListingComponent,
    FixtureComponent,
    MatchDialogComponent,
    TeamComponent,
    TeamDialogComponent,
    PlayedUpDialogComponent,
    PlayedUpBottomsheetComponent,
    DeductPointsComponent,
    DeductPointsDialogComponent,
    EditTeamDialogComponent,
    UmpireListingComponent,
    EditUmpireDialogComponent,
    AddUmpireDialogComponent,
    ConfirmDeleteComponent,
    EditFixtureDialogComponent,
    MovePlayerDialogComponent,
    AddPlayerDialogComponent,
    LoginScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppMaterialModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    LayoutModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ChartsModule,
    Ng2OdometerModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: () => {
    //       const user: any = localStorage.getItem('currentUser');
    //       console.log(user);
    //       return user;
    //     },
    //     skipWhenExpired: true,
    //     whitelistedDomains: ['api.enl.cidev.com'],
    //     // todo - add whitelisted domains here
    //   }
    // }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    StoreModule.forFeature(fromSeason.seasonFeatureKey, fromSeason.reducer),
    StoreModule.forFeature(fromDivision.divisionFeatureKey, fromDivision.reducer),
    StoreModule.forFeature(fromMatch.matchFeatureKey, fromMatch.reducer),
    StoreModule.forFeature(fromTeam.teamFeatureKey, fromTeam.reducer),
    EffectsModule.forFeature([SeasonEffects, DivisionEffects, MatchEffects, TeamEffects, TableEffects, UmpireEffects]),
    StoreModule.forFeature(fromPlayer.playerFeatureKey, fromPlayer.reducer),
    FormsModule,
    StoreModule.forFeature(fromTable.tableFeatureKey, fromTable.reducer),
    StoreModule.forFeature(fromUmpire.umpireFeatureKey, fromUmpire.reducer)
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-GB' },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {disableClose: true, hasBackdrop: true}},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ThemeService
  ],
  entryComponents: [
    MatchDialogComponent,
    TeamDialogComponent,
    PlayedUpDialogComponent,
    PlayedUpBottomsheetComponent,
    DeductPointsDialogComponent,
    EditTeamDialogComponent,
    EditUmpireDialogComponent,
    AddUmpireDialogComponent,
    ConfirmDeleteComponent,
    EditFixtureDialogComponent,
    MovePlayerDialogComponent,
    AddPlayerDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
