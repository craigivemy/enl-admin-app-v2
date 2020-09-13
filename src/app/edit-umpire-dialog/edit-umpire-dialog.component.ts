import {Component, Inject, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {UmpireService} from "../umpire.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Umpire} from "../models/umpire";
import {Update} from "@ngrx/entity";
import {updateUmpire} from "../umpire-listing/umpire.actions";
import {MessengerService} from "../messenger.service";

@Component({
  selector: 'app-edit-umpire-dialog',
  templateUrl: './edit-umpire-dialog.component.html',
  styleUrls: ['./edit-umpire-dialog.component.scss']
})
export class EditUmpireDialogComponent implements OnInit {
  editUmpireForm: FormGroup;
  currentUmpireDetails: Umpire;
  constructor(
    private store: Store<AppState>,
    private umpireService: UmpireService,
    private messengerService: MessengerService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditUmpireDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.currentUmpireDetails = this.data.umpire;
    this.editUmpireForm = this.fb.group({
      forename: [this.data.umpire.forename, Validators.required],
      surname: [this.data.umpire.surname, Validators.required],
      about: [this.data.umpire.about],
      phone: [this.data.umpire.phone],
      email: [this.data.umpire.email, Validators.email],
    });
  }

  ngOnInit() {
  }

  get email() {
    return this.editUmpireForm.get('email');
  }

  save() {
    if (this.editUmpireForm.valid) {
      if (this.editUmpireForm.dirty) {
        const changes = this.editUmpireForm.value;
        this.umpireService.updateUmpire(changes, this.currentUmpireDetails.id)
          .subscribe(() => {
            const updatedUmpire: Update<Umpire> = {
              id: this.currentUmpireDetails.id,
              changes
            };
            this.store.dispatch(updateUmpire({umpire: updatedUmpire}));
            this.dialogRef.close();
            this.messengerService.sendMessage('Saved', 1000);
          });
      } else {
        this.dialogRef.close();
      }
    }
  }
}
