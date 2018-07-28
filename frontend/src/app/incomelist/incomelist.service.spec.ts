import { TestBed, inject } from '@angular/core/testing';

import { IncomelistService } from './incomelist.service';

describe('IncomelistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IncomelistService]
    });
  });

  it('should be created', inject([IncomelistService], (service: IncomelistService) => {
    expect(service).toBeTruthy();
  }));
});
