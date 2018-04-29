import { Workout } from './Workouts';
import { Meal } from './Meal';

export class Account {
  id?: number;
  username?: string;
  password?: string;
  fName?: string;
  lName?: string;
  height?: number;
  weight?: string;
  allergies?: Array<string>;
  workouts?: Array<Workout>;
  breakfast?: Array<Meal>;
  lunch?: Array<Meal>;
  dinner?: Array<Meal>;
  calsEaten?: Array<number>;
  calsBurned?: Array<number>;
  goal?: string;
  toDo?: number;
  public?: boolean;
  age?: number;
}
