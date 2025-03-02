import { TestBed } from '@angular/core/testing';

import { IncidenceResolver } from './incidence.resolver';

describe('IncidenceResolver', () => {
  let resolver: IncidenceResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(IncidenceResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
