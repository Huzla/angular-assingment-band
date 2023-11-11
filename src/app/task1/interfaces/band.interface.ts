import { BandMembers } from "./band-members.interface";

export interface Band {
    members: BandMembers;
    plays: Record<string, string[]>; 
}