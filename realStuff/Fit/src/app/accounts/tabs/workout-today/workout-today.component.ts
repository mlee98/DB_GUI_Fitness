import { Workout } from './../../../domain/models/Workouts';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountRepostitory } from '../../../domain/account-repository.service';
import { Account } from '../../../domain/models/Account';
import { DatePipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-workout-today',
  templateUrl: './workout-today.component.html',
  styleUrls: ['./workout-today.component.css']
})
export class WorkoutTodayComponent implements OnInit {

  constructor(
    public acocuntRepository: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private slicePipe: SlicePipe,
  ) { }

  public workouts: Workout[];
  public pickedWorkout: Workout;
  public goal: number;
  public type: string[];
  public repsRecord: number[];
  public showInputs: boolean;
  public alreadyWorkdedOut: boolean;
  public date: Date;

  ngOnInit() {
    this.date = new Date();
    this.type = [];
    this.workouts = [];
    this.pickedWorkout = {};
    this.showInputs = false;
    this.alreadyWorkdedOut = false;
    this.activedRoute.params.subscribe((params: any) => {
        this.acocuntRepository.getWorkoutToday(+params.id).subscribe(data => {
          this.workouts = data;
          const date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
          let dateCheck = this.workouts[0].date;
          dateCheck = this.slicePipe.transform(dateCheck, 0, 10);
          if (dateCheck === date) {
           this.alreadyWorkdedOut = true;
          }
       });
     });
  }

  public selectWorkout(work: any) {
    this.pickedWorkout = work;
    this.repsRecord = this.pickedWorkout.reps;
    this.pickedWorkout.date =  this.datePipe.transform(this.date, 'yyyy-MM-dd');
    for (let i = 0; i < this.pickedWorkout.reps.length; i++) {
      if (this.pickedWorkout.reps[i] > 10) {
        this.type[i] = 'reps';
      } else {
        this.type[i] = 'minutes';
      }
    }
    for (let i = 0; i < this.pickedWorkout.reps.length; i++) {
      this.pickedWorkout.reps[i] = Math.ceil(this.pickedWorkout.reps[i] * (this.pickedWorkout.todo / 100));
    }
    this.showInputs = true;
  }

  public addWorkout() {
    this.activedRoute.params.subscribe((params: any) => {
      this.acocuntRepository.postWorkoutToday(+params.id, this.pickedWorkout).subscribe(data => {
      });
    });
  }

  public updatePercent() {
    let newPercent = 0;
    for (let i = 0; i < this.repsRecord.length; i++) {
        newPercent = newPercent + (this.repsRecord[i] / this.pickedWorkout.reps[i]);
    }
    newPercent = newPercent / 4 * 100;
    newPercent = (newPercent * this.pickedWorkout.goal) / 100;
    this.activedRoute.params.subscribe((params: any) => {
      this.acocuntRepository.postWorkoutPercent(+params.id, newPercent, this.pickedWorkout).subscribe(data => {
        this.alreadyWorkdedOut = true;
      });
    });
  }
}
