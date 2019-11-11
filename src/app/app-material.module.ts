import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, MatStepperModule} from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatStepperModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    MatCardModule,
    MatStepperModule,
    MatInputModule,
    MatDatepickerModule
  ],
  providers: [
    MatNativeDateModule
  ],
})
export class AppMaterialModule { }
