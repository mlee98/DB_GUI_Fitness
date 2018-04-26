import { Exercise } from './../../domain/models/Exercise';
import { Component, OnInit } from '@angular/core';
import { Workout } from '../../domain/models/Workouts';


@Component({
  selector: 'app-workout-past',
  templateUrl: './workout-past.component.html',
  styleUrls: ['./workout-past.component.css']
})
export class WorkoutPastComponent implements OnInit {

  public workouts: Array<Workout>;

  public tempWork: Workout;

  public tempExer: Exercise;

  public tempExer1: Exercise;

  public tempExer2: Exercise;

  public tempExer3: Exercise;

  constructor() { }

  ngOnInit() {
   /* this.tempWork = {};
    this.tempExer = {};
    this.tempExer1 = {};
    this.tempExer2 = {};
    this.tempExer3 = {};
    this.workouts = [];
    this.tempWork.date = new Date;
    this.tempWork.workoutName = 'Chest Burn';
    this.tempWork.type = 'Chest';
    this.tempWork.wid = 1;
    this.tempWork.exercises = [];
    this.tempExer.name = 'Bench Press';
    this.tempWork.exercises.push(this.tempExer);
    this.tempExer1.name = 'Incline Bench';
    this.tempWork.exercises.push(this.tempExer1);
    this.tempExer2.name = 'Decline bench';
    this.tempWork.exercises.push(this.tempExer2);
    this.tempExer3.name = 'Chest Flys';
    this.tempWork.exercises.push(this.tempExer3);
    this.workouts.push(this.tempWork);*/
  }

}
