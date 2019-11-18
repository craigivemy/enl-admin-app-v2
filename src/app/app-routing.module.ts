import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NewSeasonComponent} from './new-season/new-season.component';
import {DivisionsTeamsListingComponent} from "./divisions-teams-listing/divisions-teams-listing.component";
import {AllTeamsListingComponent} from './all-teams-listing/all-teams-listing.component';
import {AllPlayersListingComponent} from './all-players-listing/all-players-listing.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'new-season', component: NewSeasonComponent },
  { path: 'divisions', component: DivisionsTeamsListingComponent },
  { path: 'teams', component: AllTeamsListingComponent },
  { path: 'players', component: AllPlayersListingComponent }
  // todo - have only players from this season listed to switch around?
  // then an add players page? Or a generic add page where can add teams, players etc?
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
