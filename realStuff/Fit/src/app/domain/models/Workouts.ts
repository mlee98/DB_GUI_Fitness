import { Exercise } from './Exercise';

export class Workout {
  date?: Date;
  wid?: number;
  type?: string;
  exercises?: Array<string>;
  reps?: Array<number>;
  todo?: number;
  goal?: number;
}
