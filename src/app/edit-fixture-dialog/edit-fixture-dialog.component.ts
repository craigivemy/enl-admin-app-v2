import {Component, Inject, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from 'moment';
import {fixtureTimes} from "../../data/fixture-times";
import {MatchService} from "../match.service";
import {Update} from "@ngrx/entity";
import {Match} from "../models/match";
import {matchUpdated} from "../match/match.actions";
import {MessengerService} from "../messenger.service";
import {SettingService} from "../setting.service";
import {map, tap} from "rxjs/operators";
import {range} from "rxjs";

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
      ]
    },
    {
      name: 'All',
      times: fixtureTimes
    },
  ];
  courts = [];
  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<EditFixtureDialogComponent>,
    private matchService: MatchService,
    private messengerService: MessengerService,
    private settingsService: SettingService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    console.log(this.data.fixture);
    this.editFixtureForm = this.fb.group({
      fixtureTime: [moment(this.data.fixture.matchDate).format('HH:mm'), Validators.required],
      fixtureDate: [new Date(moment(this.data.fixture.matchDate).format('M/D/Y')), Validators.required],
      court: [this.data.fixture.court, Validators.required],
      // todo - some sort of check for dupes, or for teams not playing one another?
      // todo too much to do async? Maybe a button to run checks? - probably less annoying
    });
    this.settingsService.getSettings().pipe(
      tap(val => console.log(val)),
      map(settings => {
          settings.map(setting => {
            if (setting.name === 'match_times') {
              const times = JSON.parse(setting.settingValue);
              for (let time of times) {
                this.fixtureTimeGroups[0].times
                  .push({value: moment(time, 'HH:mm').format('HH:mm'), viewValue: moment(time, 'HH:mm').format('h:mm a')});
              }
            } else if (setting.name === 'number_of_courts') {
              const courtsRange = [];
              for (let i = 1; i < parseInt(setting.settingValue); i++) {
                courtsRange.push(i);
              }
              this.courts = courtsRange;
            }
          });
        }
      )
    ).subscribe(() => console.log(this.fixtureTimeGroups[0].times));
  }

  ngOnInit() {
  }


  save() {
    if (this.editFixtureForm.valid) {
      const date = moment(this.editFixtureForm.controls.fixtureDate.value).format('YYYY-MM-DD');
      const time = moment(this.editFixtureForm.controls.fixtureTime.value, 'HH:mm:ss').format('HH:mm:ss');
      const dateTime = moment(date + ' ' + time).format('YYYY-MM-DD HH:mm:ss');
      const changes = this.editFixtureForm.value;
      changes.match_date = dateTime;
      delete changes.fixtureDate;
      delete changes.fixtureTime;
      console.log(changes);
      this.matchService.updateFixture(changes, this.data.fixture.id)
        .subscribe(() => {
          const updatedFixture: Update<Match> = {
            id: this.data.fixture.id,
            changes
          };
          this.store.dispatch(matchUpdated({match: updatedFixture}));
          this.dialogRef.close();
          this.messengerService.sendMessage('Saved', 1000);
        });
    }
  }
}
