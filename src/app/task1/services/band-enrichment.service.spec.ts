import { TestBed } from '@angular/core/testing';

import { BandEnrichmentService } from './band-enrichment.service';
import { IncompleteBand } from '../interfaces/band.interface';

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
      const testData: IncompleteBand = {
        members: {
          current: [
            {name: 'a', age: 1, plays: []},
            {name: 'b', age: 2, plays: []},
          ],
          past: [
              {name: 'c', age: 3, plays: []},
          ]
        }
      };
      
      expect(service.AddAll(testData).members.all.length).toEqual(3);
      expect(service.AddAll({ members: { ...testData.members, current: [] } }).members.all.length).toEqual(1);
      expect(service.AddAll({ members: { ...testData.members, past: [] } }).members.all.length).toEqual(2);
      expect(service.AddAll({ members: { current: [], past: [] } }).members.all.length).toEqual(0);
    });

    it('should return names in lowercase', () => {
      const testData: IncompleteBand = {
        members: {
          current: [
            {name: 'Aapo-Kalevi Jukanpoika', age: 1, plays: []},
            {name: 'someGuy', age: 2, plays: []},
          ],
          past: [
              {name: 'WeIrD nAME', age: 3, plays: []},
          ]
        }
      };

      const actual = service.AddAll(testData);

      expect(actual.members.all).toEqual(jasmine.arrayWithExactContents(['aapo-kalevi jukanpoika', 'someguy', 'weird name']));
    });

    it('should return names sorted first by age DESC and then name ASC', () => {
      const testData: IncompleteBand = {
        members: {
          current: [
            {name: 'Zorro', age: 1, plays: []},
            {name: 'someGuy', age: 98, plays: []},
            {name: 'Aapo-Kalevi Jukanpoika', age: 12, plays: []},
          ],
          past: [
              {name: '', age: 12, plays: []},
              {name: 'Thor', age: 12, plays: []},
          ]
        }
      };

      const actual = service.AddAll(testData).members.all.map(name => name.toLowerCase());

      expect(actual).toEqual(['zorro', '', 'aapo-kalevi jukanpoika', 'thor', 'someguy']);
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
