import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UmpireEffects } from './umpire.effects';

describe('UmpireEffects', () => {
  let actions$: Observable<any>;
  let effects: UmpireEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UmpireEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<UmpireEffects>(UmpireEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
