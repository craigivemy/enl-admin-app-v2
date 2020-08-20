import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Team} from "../models/team";

@Component({
  selector: 'app-deduct-points-dialog',
  templateUrl: './deduct-points-dialog.component.html',
  styleUrls: ['./deduct-points-dialog.component.scss']
})
export class DeductPointsDialogComponent implements OnInit {
  team: Team;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DeductPointsDialogComponent>
  ) {
    this.team = this.data.team;
  }

  ngOnInit() {

  }

}
