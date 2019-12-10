export class Match {
  id?: number;
  seasonId: number;
  divisionId: number;
  homeId: number;
  homeScore: number;
  homeTeamName: string;
  awayTeamName: string;
  awayId: number;
  awayScore: number;
  matchDate: string;
  court: number;
  round: number;
  played: boolean;
  walkover: boolean;
  homeAdjust: number;
  awayAdjust: number;
}
