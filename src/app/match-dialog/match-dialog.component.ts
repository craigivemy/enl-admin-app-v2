import {Component, Inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {MatchService} from '../match.service';
import {Match} from '../models/match';
import {matchUpdated} from '../match/match.actions';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSlideToggleChange} from '@angular/material';
import {distinctUntilChanged, tap} from 'rxjs/operators';
import {Update} from '@ngrx/entity';
import {MessengerService} from "../messenger.service";

@Component({
  selector: 'app-match-dialog',
  templateUrl: './match-dialog.component.html',
  styleUrls: ['./match-dialog.component.scss']
})
export class MatchDialogComponent implements OnInit {
  matchEditForm: FormGroup;
  homeTeamName: string;
  awayTeamName: string;
  matchId: number;
  constructor(
    private store: Store<AppState>,
    private matchService: MatchService,
    private messengerService: MessengerService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MatchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data ) {
      this.matchId = data.match.id;
      this.homeTeamName = data.match.homeTeamName;
      this.awayTeamName = data.match.awayTeamName;

      this.matchEditForm = this.fb.group({
        homeScore: [{ value: data.match.homeScore, disabled: data.match.walkoverHome || data.match.walkoverAway }],
        awayScore: [{ value: data.match.awayScore,  disabled: data.match.walkoverHome || data.match.walkoverAway }],
        walkoverHome: [data.match.walkoverHome],
        walkoverAway: [data.match.walkoverAway]
      });
    }

  ngOnInit() {
    this.matchEditForm.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(values => {
      if (values.walkoverHome || values.walkoverAway) {
        this.matchEditForm.get('homeScore').disable({onlySelf: true});
        this.matchEditForm.get('awayScore').disable({onlySelf: true});
      } else {
        this.matchEditForm.get('homeScore').enable({onlySelf: true});
        this.matchEditForm.get('awayScore').enable({onlySelf: true});
      }
    });
  }

  saveMatch() {
    // todo - only if changes have been made
    const changes = this.matchEditForm.value;
    this.matchService.saveMatch(this.matchId, changes).subscribe(
      () => {
        console.log(changes);
        const match: Update<Match> = {
          id: this.matchId,
          changes
        };
        this.store.dispatch(matchUpdated({match}));
        this.dialogRef.close({updated: true});
        this.messengerService.sendMessage('Result Updated');
      }
    );
  }
  onCancel(): void {
    this.dialogRef.close({updated: false});
  }

  walkoverToggle(event: MatSlideToggleChange, index: number) {
    if (event.checked) {
      if (index === 1) {
        this.matchEditForm.controls.walkoverAway.setValue(false);
      } else {
        this.matchEditForm.controls.walkoverHome.setValue(false);
      }
    }
  }

}
