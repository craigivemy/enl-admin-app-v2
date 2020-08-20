import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material";
import {Player} from "../models/player";

@Component({
  selector: 'app-played-up-bottomsheet',
  templateUrl: './played-up-bottomsheet.component.html',
  styleUrls: ['./played-up-bottomsheet.component.scss']
})
export class PlayedUpBottomsheetComponent implements OnInit {
  player: Player;
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.player = data.player;
  }
  ngOnInit() {
  }

}
