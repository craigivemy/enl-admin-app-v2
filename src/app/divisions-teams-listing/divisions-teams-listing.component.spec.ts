import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionsTeamsListingComponent } from './divisions-teams-listing.component';

describe('DivisionsTeamsListingComponent', () => {
  let component: DivisionsTeamsListingComponent;
  let fixture: ComponentFixture<DivisionsTeamsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisionsTeamsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionsTeamsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
