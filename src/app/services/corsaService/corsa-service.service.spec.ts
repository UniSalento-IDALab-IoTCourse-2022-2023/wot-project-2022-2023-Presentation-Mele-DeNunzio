import { TestBed } from '@angular/core/testing';

import { CorsaServiceService } from './corsa-service.service';

describe('CorsaServiceService', () => {
  let service: CorsaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorsaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
