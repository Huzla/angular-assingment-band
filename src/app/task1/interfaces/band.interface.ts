import { IBandMembers, IIncompleteBandMembers } from "./band-members.interface";

export interface IBand extends IIncompleteBand {
    members: IBandMembers;
    plays: Record<string, string[]>;
}

export interface IIncompleteBand {
    members: IIncompleteBandMembers;
    plays?: Record<string, string[]>;
}