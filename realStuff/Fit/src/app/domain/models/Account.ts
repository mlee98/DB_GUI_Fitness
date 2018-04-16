import { Workout } from './Workouts';

export class Account {
  id?: number;
  username?: string;
  password?: string;
  name?: string;
  height?: string;
  weight?: string;
  disabilities?: Array<string>;
  workouts?: Array<Workout>;
  calsEaten?: Array<number>;
  calsBurned?: Array<number>;
  goal?: string;
  public?: boolean;
}
