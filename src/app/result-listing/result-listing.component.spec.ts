import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultListingComponent } from './result-listing.component';

describe('ResultListingComponent', () => {
  let component: ResultListingComponent;
  let fixture: ComponentFixture<ResultListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
