import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import {ReactiveFormsModule} from '@angular/forms';
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
    ResultListingComponent
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
    StoreModule.forFeature('seasons', fromSeason.reducer),
    StoreModule.forFeature('divisions', fromDivision.reducer),
    EffectsModule.forFeature([SeasonEffects, DivisionEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
