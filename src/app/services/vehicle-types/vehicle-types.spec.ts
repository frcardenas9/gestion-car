import { TestBed } from '@angular/core/testing';

import { VehicleTypes } from './vehicle-types';

describe('VehicleTypes', () => {
  let service: VehicleTypes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleTypes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
