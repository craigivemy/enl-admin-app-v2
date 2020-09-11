import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmpireListingComponent } from './umpire-listing.component';

describe('UmpireListingComponent', () => {
  let component: UmpireListingComponent;
  let fixture: ComponentFixture<UmpireListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmpireListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmpireListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
