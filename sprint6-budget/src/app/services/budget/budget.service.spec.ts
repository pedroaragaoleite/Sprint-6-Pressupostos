import { TestBed } from '@angular/core/testing';

import { BudgetService } from './budget.service';

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('shoud return a number', () => {
    const result = service.totalWeb(5, 5);
    expect(typeof result).toBe('number');
  });
  it('it shoud be different from Nan', () => {
    const result = service.totalWeb(5, 5);
    expect(typeof result).not.toBeNaN();
  });
});
