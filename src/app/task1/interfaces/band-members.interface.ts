import { IMember } from "./member.interface";

export interface IBandMembers extends IIncompleteBandMembers {
    all: string[];
}

export interface IIncompleteBandMembers {
    current: IMember[];
    past: IMember[];
    all?: string[];
}