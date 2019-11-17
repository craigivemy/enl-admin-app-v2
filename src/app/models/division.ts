import {Team} from "./team";

export class Division {
  id: number;
  name: string;
  current: boolean;
  teams?: Team[];
}
