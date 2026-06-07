import { TestBed } from '@angular/core/testing';

import { Refuel } from './refuel';

describe('Refuel', () => {
  let service: Refuel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Refuel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
