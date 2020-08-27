import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Team} from "../models/team";
import {Observable} from "rxjs";
import {TeamPointAdjustment} from "../models/teamPointAdjustment";
import {TeamPointAdjustmentService} from "../team-point-adjustment.service";
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {selectCurrentSeasonId} from "../season/season.selectors";
import {concatMap, filter, flatMap, map, tap, toArray} from "rxjs/operators";
import {FormArray, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-deduct-points-dialog',
  templateUrl: './deduct-points-dialog.component.html',
  styleUrls: ['./deduct-points-dialog.component.scss']
})
export class DeductPointsDialogComponent implements OnInit {
  team: Team;
  adjustments$: Observable<TeamPointAdjustment[]>;
  formEmpty: boolean;
  seasondId: number;
  deductPointsForm = this.fb.group({
    deductions: this.fb.array([this.createItem()])
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DeductPointsDialogComponent>,
    private teamPointAdjustmentService: TeamPointAdjustmentService,
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.team = this.data.team;
  }

  ngOnInit() {

    this.store.pipe(
      select(selectCurrentSeasonId),
      filter(seasonId => seasonId > 0),
    ).subscribe(seasonId => {
      this.seasondId = seasonId;
      // todo - use store
      this.teamPointAdjustmentService.getTeamPointAdjustment(this.team.id, seasonId).pipe(
        map(adjustments => adjustments.map(
          adjustment => this.addControl(adjustment)
        ))
      ).subscribe();
    });
  }

  createItem(values?: any) {
    if (values != null) {
      return this.fb.group({
        deduction: [values.point_adjustment, Validators.compose([Validators.required, Validators.max(-1)])],
        reason: [values.reason, Validators.required],
        reasonDate: [values.reason_date, Validators.required]
      });
    } else {
      return this.fb.group({
        deduction: ['-1', Validators.compose([Validators.required, Validators.max(-1)])],
        reason: ['', Validators.required],
        reasonDate: ['', Validators.required]
      });
    }
  }

  addControl(init?: any) {
    if (init) {
      (this.deductPointsForm.controls['deductions'] as FormArray).push(this.createItem(init));
    } else {
      this.formEmpty = false;
      if (this.deductPointsForm.controls['deductions'].valid) {
        (this.deductPointsForm.controls['deductions'] as FormArray).insert(0, this.createItem());
      }
    }
  }

  removeControl(i: number) {
    (this.deductPointsForm.controls['deductions'] as FormArray).removeAt(i);
    this.formEmpty = (this.deductPointsForm.controls['deductions'] as FormArray).length < 1 ? true : false;
  }

  save(): void {
    if (this.deductPointsForm.valid) {
      this.teamPointAdjustmentService.updateTeamPointAdjustments(this.team.id, this.seasondId, this.deductPointsForm.value).subscribe(
        () => window.location.reload()
      );
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }


}
