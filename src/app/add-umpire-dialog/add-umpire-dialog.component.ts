import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {UmpireService} from "../umpire.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material";
import {addUmpire} from "../umpire-listing/umpire.actions";
import {MessengerService} from "../messenger.service";

@Component({
  selector: 'app-add-umpire-dialog',
  templateUrl: './add-umpire-dialog.component.html',
  styleUrls: ['./add-umpire-dialog.component.scss']
})
export class AddUmpireDialogComponent implements OnInit {
  addUmpireForm: FormGroup;
  constructor(
    private store: Store<AppState>,
    private umpireService: UmpireService,
    private messengerService: MessengerService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUmpireDialogComponent>
  ) {
    this.addUmpireForm = this.fb.group({
      forename: ['', Validators.required],
      surname: ['', Validators.required],
      about: [''],
      phone: [''],
      email: ['', Validators.email],
    });
  }

  ngOnInit() {
  }

  get email() {
    return this.addUmpireForm.get('email');
  }

  save() {
    if (this.addUmpireForm.valid) {
      this.umpireService.addUmpire(this.addUmpireForm.value)
        .subscribe(umpire =>
          this.store.dispatch(addUmpire({umpire}))
        );
      this.dialogRef.close();
      this.messengerService.sendMessage('Umpire Added', 1000);
    }
  }

}
