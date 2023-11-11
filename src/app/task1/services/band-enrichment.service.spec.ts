import { TestBed } from '@angular/core/testing';

import { BandEnrichmentService } from './band-enrichment.service';

describe('BandEnrichmentService', () => {
  let service: BandEnrichmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BandEnrichmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
