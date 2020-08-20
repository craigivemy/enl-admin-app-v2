import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppMaterialModule} from './app-material.module';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AppWrapperComponent } from './app-wrapper/app-wrapper.component';
import { HomeComponent } from './home/home.component';
import { NewSeasonComponent } from './new-season/new-season.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
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
import { TableEffects } from './tables/table.effects';
import { TeamDialogComponent } from './team-dialog/team-dialog.component';
import { PlayedUpDialogComponent } from './played-up-dialog/played-up-dialog.component';
import { PlayedUpBottomsheetComponent } from './played-up-bottomsheet/played-up-bottomsheet.component';
import { DeductPointsComponent } from './deduct-points/deduct-points.component';
import { DeductPointsDialogComponent } from './deduct-points-dialog/deduct-points-dialog.component';

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
    DeductPointsDialogComponent
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
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    StoreModule.forFeature(fromSeason.seasonFeatureKey, fromSeason.reducer),
    StoreModule.forFeature(fromDivision.divisionFeatureKey, fromDivision.reducer),
    StoreModule.forFeature(fromMatch.matchFeatureKey, fromMatch.reducer),
    StoreModule.forFeature(fromTeam.teamFeatureKey, fromTeam.reducer),
    EffectsModule.forFeature([SeasonEffects, DivisionEffects, MatchEffects, TeamEffects, TableEffects]),
    StoreModule.forFeature(fromPlayer.playerFeatureKey, fromPlayer.reducer),
    FormsModule,
    StoreModule.forFeature(fromTable.tableFeatureKey, fromTable.reducer)
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-GB' },
  ],
  entryComponents: [
    MatchDialogComponent,
    TeamDialogComponent,
    PlayedUpDialogComponent,
    PlayedUpBottomsheetComponent,
    DeductPointsDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
