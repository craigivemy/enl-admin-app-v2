import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DATE_LOCALE, MatCardModule, MatDatepickerModule, MatInputModule, MatStepperModule} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatStepperModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  exports: [
    MatCardModule,
    MatStepperModule,
    MatInputModule,
    MatDatepickerModule
  ],
  providers: [
    MatMomentDateModule,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
})
export class AppMaterialModule { }
