import { Exercise } from './Exercise';

export class Workout {
  date?: Date;
  wid?: number;
  workoutName?: string;
  type?: string;
// calsBurned: number;
  exercises?: Array<Exercise>;
}
