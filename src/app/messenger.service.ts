import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  constructor(
    private snackbar: MatSnackBar
  ) { }

  sendMessage(message: string, delay?: number) {
    setTimeout(() => {
      return this.snackbar.open(message, '', {
        duration: 2000
      });
    }, delay);
  }


}
