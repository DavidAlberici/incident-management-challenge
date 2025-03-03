import { TestBed } from '@angular/core/testing';

import { IncidenceListResolver } from './incidence-list.resolver';

describe('IncidenceListResolver', () => {
  let resolver: IncidenceListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(IncidenceListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
