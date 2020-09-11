import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DATE_LOCALE, MatBadgeModule, MatBottomSheetModule,
  MatCardModule, MatChipsModule,
  MatDatepickerModule, MatDialogModule, MatExpansionModule,
  MatInputModule, MatMenuModule, MatSelectModule, MatSlideToggleModule, MatSnackBarModule,
  MatStepperModule,
  MatTableModule, MatTabsModule,
  MatToolbarModule, MatTooltipModule
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
    MatSlideToggleModule,
    MatBadgeModule,
    MatExpansionModule,
    MatChipsModule,
    MatTooltipModule,
    MatBottomSheetModule,
    MatMenuModule,
    MatSnackBarModule
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
    MatSlideToggleModule,
    MatBadgeModule,
    MatExpansionModule,
    MatChipsModule,
    MatTooltipModule,
    MatBottomSheetModule,
    MatMenuModule,
    MatSnackBarModule
  ],
  providers: [
    MatMomentDateModule,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
})
export class AppMaterialModule { }
