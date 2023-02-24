import { TestBed } from '@angular/core/testing';

import { ExpenseCalcService } from './expense-calc.service';

describe('ExpenseCalcService', () => {
  let service: ExpenseCalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseCalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
