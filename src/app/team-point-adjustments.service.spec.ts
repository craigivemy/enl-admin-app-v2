import { TestBed } from '@angular/core/testing';

import { TeamPointAdjustmentService } from './team-point-adjustment.service';

describe('TeamPointAdjustmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeamPointAdjustmentService = TestBed.get(TeamPointAdjustmentService);
    expect(service).toBeTruthy();
  });
});
