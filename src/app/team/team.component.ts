import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Team} from '../models/team';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  team: Team;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { team: Team }) => {
        this.team = data.team;
      }
    );
  }

}
