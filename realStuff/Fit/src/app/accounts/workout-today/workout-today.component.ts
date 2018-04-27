import { Workout } from './../../domain/models/Workouts';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountRepostitory } from '../../domain/account-repository.service';
import { Account } from '../../domain/models/Account';

@Component({
  selector: 'app-workout-today',
  templateUrl: './workout-today.component.html',
  styleUrls: ['./workout-today.component.css']
})
export class WorkoutTodayComponent implements OnInit {

  constructor(
    public acocuntRepository: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) { }
  public workouts: Workout[];
  public pickedWorkout: Workout;
  public percent: number;
  public goal: number;
  public type: string[];
  public num: number[];
  ngOnInit() {
    this.workouts = [];
    this.pickedWorkout = {};
    this.activedRoute.params.subscribe((params: any) => {
        this.acocuntRepository.getWorkoutToday(+params.id).subscribe(data => {
          this.workouts = data;
          console.log(this.workouts);
       });
     });
  }
  public selectWorkout(work: Workout) {
    this.pickedWorkout = work;
    for (let i = 0; i < this.pickedWorkout.reps.length; i++) {
      if (this.pickedWorkout.reps[i] > 10) {
        this.type[i] = 'reps';
      } else {
        this.type[i] = 'minutes';
      }
    }
    for (let i = 0; i < this.pickedWorkout.reps.length; i++) {
      this.pickedWorkout.reps[i] = Math.floor(this.pickedWorkout.reps[i] * this.percent);
    }
  }

  public addWorkout() {
    this.activedRoute.params.subscribe((params: any) => {
      this.acocuntRepository.postWorkoutToday(+params.id, this.pickedWorkout).subscribe(data => {
      });
    });
  }

  public updatePercent() {
    this.activedRoute.params.subscribe((params: any) => {
      this.acocuntRepository.postWorkoutPercent(+params.id, this.percent).subscribe(data => {
      });
    });
  }
}
