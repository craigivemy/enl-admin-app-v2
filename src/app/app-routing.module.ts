import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NewSeasonComponent} from './new-season/new-season.component';
import {DivisionsTeamsListingComponent} from "./divisions-teams-listing/divisions-teams-listing.component";
import {AllTeamsListingComponent} from './all-teams-listing/all-teams-listing.component';
import {AllPlayersListingComponent} from './all-players-listing/all-players-listing.component';
import {TablesComponent} from './tables/tables.component';
import {FixtureListingComponent} from './fixture-listing/fixture-listing.component';
import {ResultListingComponent} from './result-listing/result-listing.component';
import {TeamComponent} from './team/team.component';
import {TeamResolverService} from './team/team-resolver.service';


const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { displayTitle: 'Home' } },
  { path: 'teams', component: DivisionsTeamsListingComponent, data: { displayTitle: 'Teams' } },
  { path: 'teams/:id', component: TeamComponent, resolve: { team: TeamResolverService }},
  { path: 'tables', component: TablesComponent, data: { displayTitle: 'Tables' } },
  { path: 'fixtures', component: FixtureListingComponent, data: { displayTitle: 'Fixtures' } },
  { path: 'results', component: ResultListingComponent, data: { displayTitle: 'Results' } },
  { path: 'new-season', component: NewSeasonComponent, data: { displayTitle: 'New Season' } },
  { path: 'configure-teams', component: AllTeamsListingComponent, data: { displayTitle: 'Configure Teams' } }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
