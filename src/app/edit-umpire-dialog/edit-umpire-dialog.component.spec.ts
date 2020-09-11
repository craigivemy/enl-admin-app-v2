import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUmpireDialogComponent } from './edit-umpire-dialog.component';

describe('EditUmpireDialogComponent', () => {
  let component: EditUmpireDialogComponent;
  let fixture: ComponentFixture<EditUmpireDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUmpireDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUmpireDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
