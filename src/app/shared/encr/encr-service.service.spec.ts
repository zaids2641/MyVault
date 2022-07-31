import { TestBed } from '@angular/core/testing';

import { EncrServiceService } from './encr-service.service';

describe('EncrServiceService', () => {
  let service: EncrServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncrServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
