import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPlayersListingComponent } from './all-players-listing.component';

describe('AllPlayersListingComponent', () => {
  let component: AllPlayersListingComponent;
  let fixture: ComponentFixture<AllPlayersListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPlayersListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPlayersListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
