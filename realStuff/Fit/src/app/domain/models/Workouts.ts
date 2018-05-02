import { Reps } from './reps';

export class Workout {
  date?: string;
  wid?: number;
  type?: string;
  exercises?: Array<string>;
  reps?: Array<number>;
  realReps?: Array<Reps>;
  todo?: number;
  goal?: number;
}
