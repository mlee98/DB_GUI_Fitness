import { Workout } from './../../domain/models/Workouts';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountRepostitory } from '../../domain/account-repository.service';
import { Account } from '../../domain/models/Account';
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
    private slicePipe: SlicePipe
  ) {}

  public workouts: Workout[];
  public pickedWorkout: Workout;
  public goal: number;
  public type: string[];
  public repsRecord: number[];
  public showInputs: boolean;
  public alreadyWorkdedOut: boolean;
  public date: Date;
  public types: string[][];

  ngOnInit() {
    this.date = new Date();
    this.types = [];
    this.type = [];
    this.workouts = [];
    this.pickedWorkout = {};
    this.showInputs = false;
    this.alreadyWorkdedOut = false;
    this.activedRoute.params.subscribe((params: any) => {
      this.acocuntRepository.getWorkoutToday(+params.id).subscribe(data => {
        this.workouts = data;
        console.log(this.workouts);
        for (let x = 0; x < this.workouts.length; x++) {
          this.workouts[x].realReps = [];
          for (let i = 0; i < this.workouts[x].reps.length; i++) {
            if (this.workouts[x].reps[i] > 10) {
              this.workouts[x].realReps[i].num = this.workouts[i].reps[i];
              this.workouts[x].realReps[i].type = 'minutes';
            } else {
              this.workouts[x].realReps[i].num = this.workouts[i].reps[i];
              this.workouts[x].realReps[i].type = 'reps';
            }
          }
        }
        console.log(this.workouts);
        const date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
        let dateCheck = this.workouts[0].date;
        dateCheck = this.slicePipe.transform(dateCheck, 0, 10);
        console.log(dateCheck);
        console.log(date);
        if (dateCheck === date) {
          this.alreadyWorkdedOut = true;
        }
      });
    });
  }

  public selectWorkout(work: any) {
    console.log(work);
    this.pickedWorkout = work;
    this.repsRecord = this.pickedWorkout.reps;
    this.pickedWorkout.date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    console.log(this.pickedWorkout.date);
    for (let i = 0; i < this.pickedWorkout.reps.length; i++) {
      if (this.pickedWorkout.reps[i] > 10) {
        this.type[i] = 'reps';
      } else {
        this.type[i] = 'minutes';
      }
    }
    for (let i = 0; i < this.pickedWorkout.reps.length; i++) {
      this.pickedWorkout.reps[i] = Math.ceil(
        this.pickedWorkout.reps[i] * (this.pickedWorkout.todo / 100)
      );
    }
    this.showInputs = true;
    console.log(this.showInputs);
    console.log(this.alreadyWorkdedOut);
  }

  public addWorkout() {
    this.activedRoute.params.subscribe((params: any) => {
      this.acocuntRepository
        .postWorkoutToday(+params.id, this.pickedWorkout)
        .subscribe(data => {
          console.log('here');
          console.log(this.pickedWorkout);
        });
    });
  }

  public updatePercent() {
    console.log(this.repsRecord);
    console.log(this.pickedWorkout.reps);
    console.log(this.pickedWorkout);
    let newPercent = 0;
    for (let i = 0; i < this.repsRecord.length; i++) {
      newPercent = newPercent + this.repsRecord[i] / this.pickedWorkout.reps[i];
    }
    console.log(newPercent);
    newPercent = newPercent / 4 * 100;
    console.log(newPercent);
    newPercent = newPercent * this.pickedWorkout.goal / 100;
    console.log(newPercent);
    this.activedRoute.params.subscribe((params: any) => {
      this.acocuntRepository
        .postWorkoutPercent(+params.id, newPercent, this.pickedWorkout)
        .subscribe(data => {
          this.alreadyWorkdedOut = true;
        });
    });
  }
}
