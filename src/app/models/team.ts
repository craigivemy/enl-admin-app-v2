import {Player} from './player';

export class Team {
  id: number;
  name: string;
  primaryColour?: string;
  secondaryColour?: string;
  tertiaryColour?: string;
  logoUrl?: string;
  narrative?: string;
  players?: Player[];
  activeThisSeason?: number;
  addedToSeason?: number;
  deletedAt?: string;
}
