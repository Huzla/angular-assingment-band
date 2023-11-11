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

  describe('AddAll', () => {
    it('should work with empty arrays', () => {

    });

    it('should return names from both current and past in lowercase', () => {

    });

    it('should return names sorted first by age DES and then name ASC', () => {

    });
  });

  describe('AddPlays', () => {
    it('should work with empty current or past', () => {

    });

    it('should not add members with empty plays array to any play', () => {
      
    });

    it('should add every play once', () => {
      
    });

    it('should transform names to lowercase', () => {
      
    });
  });
});
