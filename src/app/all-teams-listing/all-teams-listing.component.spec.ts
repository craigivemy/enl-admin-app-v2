import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTeamsListingComponent } from './all-teams-listing.component';

describe('AllTeamsListingComponent', () => {
  let component: AllTeamsListingComponent;
  let fixture: ComponentFixture<AllTeamsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTeamsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTeamsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
