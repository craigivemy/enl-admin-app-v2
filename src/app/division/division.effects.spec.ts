import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DivisionEffects } from './division.effects';

describe('DivisionEffects', () => {
  let actions$: Observable<any>;
  let effects: DivisionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DivisionEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<DivisionEffects>(DivisionEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
