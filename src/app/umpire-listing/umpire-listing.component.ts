import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {Observable} from "rxjs";
import {Umpire} from "../models/umpire";
import {deleteUmpire, loadUmpires} from "./umpire.actions";
import {selectAllUmpires} from "./umpire.selectors";
import {MatDialog} from "@angular/material";
import {EditUmpireDialogComponent} from "../edit-umpire-dialog/edit-umpire-dialog.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AddUmpireDialogComponent} from "../add-umpire-dialog/add-umpire-dialog.component";
import {tap} from "rxjs/operators";
import {ConfirmDeleteComponent} from "../confirm-delete/confirm-delete.component";
import {UmpireService} from "../umpire.service";
import {MessengerService} from "../messenger.service";

@Component({
  selector: 'app-umpire-listing',
  templateUrl: './umpire-listing.component.html',
  styleUrls: ['./umpire-listing.component.scss']
})
export class UmpireListingComponent implements OnInit {
  umpires$: Observable<Umpire[]>;
  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private umpireService: UmpireService,
    private messengerService: MessengerService
  ) { }

  ngOnInit() {
    this.store.dispatch(loadUmpires());
    this.umpires$ = this.store.pipe(
      select(selectAllUmpires),
      tap(umpires => {
        umpires.sort((a, b) => {
          if (a.surname > b.surname) {
            return 1;
          } else {
            return -1;
          }
        });
      })
    );
  }

  openEditDialog(umpire: Umpire) {
    const dialogRef = this.dialog.open(EditUmpireDialogComponent, {
      data: { umpire },
      panelClass: 'wide-dialog'
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddUmpireDialogComponent, {
      panelClass: 'wide-dialog'
    });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent)
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.umpireService.deleteUmpire(id).subscribe(
          () => {
            this.store.dispatch(deleteUmpire({id}));
            dialogRef.close();
            this.messengerService.sendMessage('Umpire Deleted', 1000);
          }
        );
      } else {
        dialogRef.close();
      }
    });
  }

}
