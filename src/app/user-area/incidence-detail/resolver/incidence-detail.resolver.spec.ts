import { TestBed } from '@angular/core/testing';

import { IncidenceDetailResolver } from './incidence-detail.resolver';

describe('IncidenceDetailResolver', () => {
  let resolver: IncidenceDetailResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(IncidenceDetailResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
