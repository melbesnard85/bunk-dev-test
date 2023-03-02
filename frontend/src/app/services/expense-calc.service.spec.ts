import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ExpenseCalcService } from './expense-calc.service';

describe('ExpenseCalcService', () => {
  let service: ExpenseCalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(ExpenseCalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
