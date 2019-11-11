import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppMaterialModule} from './app-material.module';
import {MatButtonModule, MatFormFieldModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AppWrapperComponent } from './app-wrapper/app-wrapper.component';
import { HomeComponent } from './home/home.component';
import { NewSeasonComponent } from './new-season/new-season.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AppWrapperComponent,
    HomeComponent,
    NewSeasonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    LayoutModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
