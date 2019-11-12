import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Division} from '../models/division';
import {DivisionService} from '../division.service';

@Component({
  selector: 'app-new-season',
  templateUrl: './new-season.component.html',
  styleUrls: ['./new-season.component.scss']
})
export class NewSeasonComponent implements OnInit {
  divisions: Observable<Division[]>;
  dynamicDivisionSteps: Division[] = [];
  basicDetailsForm = this.fb.group({
    name: ['', Validators.required],
    startDate: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private divisionsService: DivisionService) { }

  ngOnInit() {
    this.divisions = this.divisionsService.getDivisions();
  }

  updateDynamicDivisionSteps(event: any, division: Division) {
    if (event.checked) {
      this.dynamicDivisionSteps.push(division);
    } else {
      this.removeDivisionStep(division);
    }
  }
  removeDivisionStep(division: Division) {
    for (let i = 0; i < this.dynamicDivisionSteps.length; i++) {
      if (division.id === this.dynamicDivisionSteps[i].id) {
        this.dynamicDivisionSteps.splice(i);
      }
    }
  }

}
