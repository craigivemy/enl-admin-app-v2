import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayedUpComponent } from './played-up.component';

describe('PlayedUpComponent', () => {
  let component: PlayedUpComponent;
  let fixture: ComponentFixture<PlayedUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayedUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayedUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
