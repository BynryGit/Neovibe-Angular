import { TestBed } from '@angular/core/testing';

import { UtilityConfigurationService } from './utility-configuration.service';

describe('UtilityConfigurationService', () => {
  let service: UtilityConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilityConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
