import { TestBed } from '@angular/core/testing';

import { DateformatServiceService } from './dateformat-service.service';

describe('DateformatServiceService', () => {
  let service: DateformatServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateformatServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
