import {PlayedUp} from "./playedUp";

export class Player {
  id?: number;
  forename: string;
  surname: string;
  teamId: number;
  playedUpCount: number;
  playedUps: PlayedUp[];
}
