import { Member } from "./member.interface";

export interface BandMembers extends IncompleteBandMembers {
    all: string[];
}

export interface IncompleteBandMembers {
    current: Member[];
    past: Member[];
    all?: string[];
}