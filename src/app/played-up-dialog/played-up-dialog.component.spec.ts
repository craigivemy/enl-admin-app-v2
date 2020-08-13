import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayedUpDialogComponent } from './played-up-dialog.component';

describe('PlayedUpDialogComponent', () => {
  let component: PlayedUpDialogComponent;
  let fixture: ComponentFixture<PlayedUpDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayedUpDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayedUpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
