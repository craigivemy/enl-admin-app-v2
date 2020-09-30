import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  constructor(
    private snackbar: MatSnackBar
  ) { }

  sendMessage(message: string, delay: number = 500, duration: number = 2000) {
    setTimeout(() => {
      return this.snackbar.open(message, '', {
        duration
      });
    }, delay);
  }


}
