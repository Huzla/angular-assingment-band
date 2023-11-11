import { Member } from "./member.interface";

export interface BandMembers {
    current: Member[];
    past: Member[];
    all: string[];
}