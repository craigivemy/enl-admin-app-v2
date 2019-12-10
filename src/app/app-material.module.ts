import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DATE_LOCALE,
  MatCardModule,
  MatDatepickerModule, MatDialogModule,
  MatInputModule, MatSelectModule, MatSlideToggleModule,
  MatStepperModule,
  MatTableModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatStepperModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatToolbarModule,
    MatTableModule,
    MatTabsModule,
    MatSelectModule,
    MatDialogModule,
    MatSlideToggleModule
  ],
  exports: [
    MatCardModule,
    MatStepperModule,
    MatInputModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatTableModule,
    MatTabsModule,
    MatSelectModule,
    MatDialogModule,
    MatSlideToggleModule
  ],
  providers: [
    MatMomentDateModule,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
})
export class AppMaterialModule { }
