import { TestBed } from '@angular/core/testing';

import { StepperFormService } from './stepper-form.service';

describe('StepperFormService', () => {
  let service: StepperFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepperFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
