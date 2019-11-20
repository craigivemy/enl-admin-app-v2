import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureListingComponent } from './fixture-listing.component';

describe('FixtureListingComponent', () => {
  let component: FixtureListingComponent;
  let fixture: ComponentFixture<FixtureListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixtureListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixtureListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
