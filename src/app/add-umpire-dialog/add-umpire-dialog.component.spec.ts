import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUmpireDialogComponent } from './add-umpire-dialog.component';

describe('AddUmpireDialogComponent', () => {
  let component: AddUmpireDialogComponent;
  let fixture: ComponentFixture<AddUmpireDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUmpireDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUmpireDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
