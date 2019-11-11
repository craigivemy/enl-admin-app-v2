import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-season',
  templateUrl: './new-season.component.html',
  styleUrls: ['./new-season.component.scss']
})
export class NewSeasonComponent implements OnInit {
  basicDetailsForm = this.fb.group({
    name: ['', Validators.required],
    startDate: ['', Validators.required]
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
