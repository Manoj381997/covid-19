import { TestBed } from '@angular/core/testing';

import { CovidApiServiceService } from './covid-api-service.service';

describe('CovidApiServiceService', () => {
  let service: CovidApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovidApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
