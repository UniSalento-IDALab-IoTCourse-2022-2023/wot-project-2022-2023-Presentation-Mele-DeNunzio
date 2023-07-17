import { TestBed } from '@angular/core/testing';

import { IotApiService } from './iot-api.service';

describe('IotApiService', () => {
  let service: IotApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IotApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
