import { TestBed } from '@angular/core/testing';

import { NoteDetailsService } from './note-details.service';

describe('NoteDetailsService', () => {
  let service: NoteDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
