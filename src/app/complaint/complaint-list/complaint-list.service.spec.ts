import { TestBed } from '@angular/core/testing';

import { ComplaintListService } from './complaint-list.service';

describe('ComplaintListService', () => {
  let service: ComplaintListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplaintListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
