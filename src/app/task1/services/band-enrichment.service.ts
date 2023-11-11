import { Injectable } from '@angular/core';
import { IBandMembers } from '../interfaces/band-members.interface';
import { IMember } from '../interfaces/member.interface';
import { IIncompleteBand } from '../interfaces/band.interface';

@Injectable({
  providedIn: 'root'
})
export class BandEnrichmentService {

  constructor() { }

  private getSortedMemberNames(members: IMember[]): string[] {
    return members
    .sort((firstMember, secondMember) => firstMember.age == secondMember.age ? firstMember.name.toLocaleLowerCase().localeCompare(secondMember.name.toLocaleLowerCase()) :  secondMember.age - firstMember.age)
    .map(member => member.name.toLocaleLowerCase());
  }

  addAll<T extends IIncompleteBand>(IBand: T): Omit<T, 'members'> & { members: IBandMembers } {
    return { 
      ...IBand, 
      members: { 
        ...IBand.members, 
        all: this.getSortedMemberNames(IBand.members.current.concat(IBand.members.past))
      } 
    };
  } 

  private getDistinctPlays(member: IMember): string[]
  {
    return member.plays.reduce((distinctPlays, play) => distinctPlays.includes(play) ? distinctPlays : distinctPlays.concat([play]), [] as string[]);
  }

  private createPlaysObject(members: IMember[]): Record<string, string[]> {
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

  addPlays<T extends IIncompleteBand>(IBand: T): Required<IIncompleteBand> {
    return { 
      ...IBand, 
      plays: this.createPlaysObject(IBand.members.current.concat(IBand.members.past))
    };
  }
}
