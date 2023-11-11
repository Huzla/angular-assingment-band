import { BandMembers, IncompleteBandMembers } from "./band-members.interface";

export interface Band extends IncompleteBand {
    members: BandMembers;
    plays: Record<string, string[]>;
}

export interface IncompleteBand {
    members: IncompleteBandMembers;
    plays?: Record<string, string[]>;
}