import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductPointsComponent } from './deduct-points.component';

describe('DeductPointsComponent', () => {
  let component: DeductPointsComponent;
  let fixture: ComponentFixture<DeductPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeductPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeductPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
