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

  describe('addAll', () => {
    it('should work with empty arrays', () => {
      const testData: IncompleteBand = {
        members: {
          current: [
            { name: 'a', age: 1, plays: [] },
            { name: 'b', age: 2, plays: [] },
          ],
          past: [
              { name: 'c', age: 3, plays: [] },
          ]
        }
      };
      
      expect(service.addAll(testData).members.all.length).toEqual(3);
      expect(service.addAll({ members: { ...testData.members, current: [] } }).members.all.length).toEqual(1);
      expect(service.addAll({ members: { ...testData.members, past: [] } }).members.all.length).toEqual(2);
      expect(service.addAll({ members: { current: [], past: [] } }).members.all.length).toEqual(0);
    });

    it('should return names in lowercase', () => {
      const testData: IncompleteBand = {
        members: {
          current: [
            { name: 'Aapo-Kalevi Jukanpoika', age: 1, plays: [] },
            { name: 'someGuy', age: 2, plays: [] },
          ],
          past: [
              { name: 'WeIrD nAME', age: 3, plays: [] },
          ]
        }
      };

      const actual = service.addAll(testData);

      expect(actual.members.all).toEqual(jasmine.arrayWithExactContents(['aapo-kalevi jukanpoika', 'someguy', 'weird name']));
    });

    it('should return names sorted first by age DESC and then name ASC', () => {
      const testData: IncompleteBand = {
        members: {
          current: [
            { name: 'Zorro', age: 98, plays: [] },
            { name: 'someGuy', age: 1, plays: [] },
            { name: 'Aapo-Kalevi Jukanpoika', age: 12, plays: [] },
          ],
          past: [
              { name: '', age: 12, plays: [] },
              { name: 'Thor', age: 12, plays: [] },
          ]
        }
      };

      const actual = service.addAll(testData).members.all.map(name => name.toLowerCase());

      expect(actual).toEqual(['zorro', '', 'aapo-kalevi jukanpoika', 'thor', 'someguy']);
    });
  });

  describe('addPlays', () => {
    it('should work with empty current or past', () => {
      const testData: IncompleteBand = {
        members: {
          current: [
            { name: 'a', age: 1, plays: ['play1'] },
            { name: 'b', age: 2, plays: ['play2', 'play1'] },
          ],
          past: [
              { name: 'c', age: 3, plays: ['play2'] },
              { name: 'd', age: 3, plays: [] }
          ]
        }
      };

      expect(Object.keys(service.addPlays(testData).plays).length).toEqual(2);
      expect(Object.keys(service.addPlays({ members: { ...testData.members, current: [] } }).plays).length).toEqual(1);
      expect(Object.keys(service.addPlays({ members: { ...testData.members, past: [] } }).plays).length).toEqual(2);
      expect(Object.keys(service.addPlays({ members: { current: [], past: [] } }).plays).length).toEqual(0);
    });

    it('should not add members with empty plays array to any play', () => {
      const testData: IncompleteBand = {
        members: {
          current: [
            { name: 'a', age: 1, plays: ['play1'] },
            { name: 'b', age: 2, plays: ['play2', 'play1'] },
          ],
          past: [
              { name: 'c', age: 3, plays: ['play2'] },
              { name: 'd', age: 3, plays: [] }
          ]
        }
      };

      expect(Object.values(service.addPlays(testData).plays).flat()).toEqual(jasmine.arrayWithExactContents(['a', 'b', 'b', 'c']));
    });

    it('should not add members twice with duplicate plays', () => {
      const testDataWithDuplicates = {
        members: {
          current: [
            { name: 'a', age: 1, plays: ['play1'] },
            { name: 'b', age: 2, plays: ['play2', 'play1'] },
          ],
          past: [
              { name: 'c', age: 3, plays: ['play2', 'play2'] }
          ]
        }
      };

      expect(Object.values(service.addPlays(testDataWithDuplicates).plays).flat()).toEqual(jasmine.arrayWithExactContents(['a', 'b', 'b', 'c']));
    });

    it('should add every play once', () => {
      const testData: IncompleteBand = {
        members: {
          current: [
            { name: 'a', age: 1, plays: ['play1'] },
            { name: 'b', age: 2, plays: ['play2', 'play1'] },
          ],
          past: [
              { name: 'c', age: 3, plays: ['play2'] },
              { name: 'd', age: 3, plays: [] }
          ]
        }
      };

      expect(Object.keys(service.addPlays(testData).plays).length).toEqual(jasmine.arrayWithExactContents(['play1', 'play2']));
    });

    it('should transform names to lowercase', () => {
      const testData = {
        members: {
          current: [
            { name: 'Aapo', age: 1, plays: ['play1'] },
          ],
          past: [
              { name: 'wEiRDname', age: 3, plays: ['play2', 'play2'] }
          ]
        }
      };

      expect(Object.values(service.addPlays(testData).plays).flat()).toEqual(jasmine.arrayWithExactContents(['aapo', 'weirdname']));
    });
  });
});
