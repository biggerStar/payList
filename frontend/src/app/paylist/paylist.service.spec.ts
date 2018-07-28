import { TestBed, inject } from '@angular/core/testing';

import { PaylistService } from './paylist.service';

describe('PaylistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaylistService]
    });
  });

  it('should be created', inject([PaylistService], (service: PaylistService) => {
    expect(service).toBeTruthy();
  }));
});
