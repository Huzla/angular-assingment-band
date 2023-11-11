import { Injectable } from '@angular/core';
import { Band, IncompleteBand } from '../interfaces/band.interface';
import { BandMembers } from '../interfaces/band-members.interface';

@Injectable({
  providedIn: 'root'
})
export class BandEnrichmentService {

  constructor() { }

  AddAll<T extends IncompleteBand>(band: T): Omit<T, 'members'> & { members: BandMembers }
  {
    return { ...band, members: { ...band.members, all: [] } };
  } 

  AddPlays<T extends IncompleteBand>(band: T): T  & Required<Pick<T, 'plays'>>
  {
    return { ...band, plays: {} };
  }
}
