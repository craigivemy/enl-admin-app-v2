import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NewSeasonComponent} from './new-season/new-season.component';
import {TeamListingComponent} from "./team-listing/team-listing.component";


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'new-season', component: NewSeasonComponent },
  { path: 'teams', component: TeamListingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
