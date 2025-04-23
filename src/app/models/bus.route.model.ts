import { Shape } from './shape.model';

export interface BusRoute {
  id: string;
  shortName: string;
  longName: string;
  color: string;
  textColor: string;
  shapes?: Shape[];
}
