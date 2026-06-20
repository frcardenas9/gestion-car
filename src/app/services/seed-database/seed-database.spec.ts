import { TestBed } from '@angular/core/testing';

import { SeedDatabase } from './seed-database';

describe('SeedDatabase', () => {
  let service: SeedDatabase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeedDatabase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
