import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FixtureEffects } from './fixture.effects';

describe('FixtureEffects', () => {
  let actions$: Observable<any>;
  let effects: FixtureEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FixtureEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<FixtureEffects>(FixtureEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
