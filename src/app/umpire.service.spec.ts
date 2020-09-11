import { TestBed } from '@angular/core/testing';

import { UmpireService } from './umpire.service';

describe('UmpireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UmpireService = TestBed.get(UmpireService);
    expect(service).toBeTruthy();
  });
});
