import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFixtureDialogComponent } from './edit-fixture-dialog.component';

describe('EditFixtureDialogComponent', () => {
  let component: EditFixtureDialogComponent;
  let fixture: ComponentFixture<EditFixtureDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFixtureDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFixtureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
