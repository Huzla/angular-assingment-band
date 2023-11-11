import { Injectable } from '@angular/core';
import { Band, IncompleteBand } from '../interfaces/band.interface';
import { BandMembers } from '../interfaces/band-members.interface';
import { Member } from '../interfaces/member.interface';

@Injectable({
  providedIn: 'root'
})
export class BandEnrichmentService {

  constructor() { }

  private getSortedMemberNames(members: Member[]): string[] {
    return members
    .sort((firstMember, secondMember) => firstMember.age == secondMember.age ? firstMember.name.toLocaleLowerCase().localeCompare(secondMember.name.toLocaleLowerCase()) :  secondMember.age - firstMember.age)
    .map(member => member.name.toLocaleLowerCase());
  }

  addAll<T extends IncompleteBand>(band: T): Omit<T, 'members'> & { members: BandMembers } {
    return { 
      ...band, 
      members: { 
        ...band.members, 
        all: this.getSortedMemberNames(band.members.current.concat(band.members.past))
      } 
    };
  } 

  private getDistinctPlays(member: Member): string[]
  {
    return member.plays.reduce((distinctPlays, play) => distinctPlays.includes(play) ? distinctPlays : distinctPlays.concat([play]), [] as string[]);
  }

  private createPlaysObject(members: Member[]): Record<string, string[]> {
    return members.reduce((plays, member) => {
      this.getDistinctPlays(member).forEach(play => {
        if (!(play in plays)) {
          plays[play] = [];
        }

        plays[play] = plays[play].concat([member.name.toLowerCase()])
      });

      return plays;
    }, { } as Record<string, string[]>);
  }

  addPlays<T extends IncompleteBand>(band: T): Required<IncompleteBand> {
    return { 
      ...band, 
      plays: this.createPlaysObject(band.members.current.concat(band.members.past))
    };
  }
}
