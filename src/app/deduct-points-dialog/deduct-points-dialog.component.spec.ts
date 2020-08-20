import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductPointsDialogComponent } from './deduct-points-dialog.component';

describe('DeductPointsDialogComponent', () => {
  let component: DeductPointsDialogComponent;
  let fixture: ComponentFixture<DeductPointsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeductPointsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeductPointsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
