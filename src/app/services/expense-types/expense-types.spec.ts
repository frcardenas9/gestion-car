import { TestBed } from '@angular/core/testing';

import { ExpenseTypes } from './expense-types';

describe('ExpenseTypes', () => {
  let service: ExpenseTypes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseTypes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
