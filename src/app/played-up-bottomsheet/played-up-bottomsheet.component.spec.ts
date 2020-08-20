import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayedUpBottomsheetComponent } from './played-up-bottomsheet.component';

describe('PlayedUpBottomsheetComponent', () => {
  let component: PlayedUpBottomsheetComponent;
  let fixture: ComponentFixture<PlayedUpBottomsheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayedUpBottomsheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayedUpBottomsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
