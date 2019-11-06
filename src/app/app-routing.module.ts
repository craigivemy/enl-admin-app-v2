import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NewSeasonComponent} from './new-season/new-season.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'new-season', component: NewSeasonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
