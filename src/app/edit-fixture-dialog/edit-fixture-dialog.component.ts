import {Component, Inject, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from 'moment';
import {fixtureTimes} from "../../data/fixture-times";

@Component({
  selector: 'app-edit-fixture-dialog',
  templateUrl: './edit-fixture-dialog.component.html',
  styleUrls: ['./edit-fixture-dialog.component.scss']
})
export class EditFixtureDialogComponent implements OnInit {
  editFixtureForm: FormGroup;
  fixtureTimeGroups = [
    {
      name: 'Scheduled Times',
      times: [
        {value: "18:30", viewValue: '6:30pm'},
        {value: "19:30", viewValue: '7:30pm'},
        {value: "20:30", viewValue: '8:30pm'},
      ]
    },
    {
      name: 'Unscheduled Times',
      times: fixtureTimes
    },
  ];
  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<EditFixtureDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    console.log(this.data.fixture);
    this.editFixtureForm = this.fb.group({
      fixtureTime: [moment(this.data.fixture.matchDate).format('HH:mm'), Validators.required],
      fixtureDate: [moment(this.data.fixture.matchDate).format('ddd Do MMM YY'), Validators.required],
      court: [this.data.fixture.court, Validators.required]
      // todo - some sort of check for dupes, or for teams not playing one another?
      // todo too much to do async? Maybe a button to run checks? - probably less annoying
    });
  }

  ngOnInit() {
  }

}
