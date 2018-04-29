import { Component, OnInit, OnChanges } from '@angular/core';
import { Workout } from '../../domain/models/Workouts';
import { AccountRepostitory } from '../../domain/account-repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, SlicePipe } from '@angular/common';


@Component({
  selector: 'app-workout-past',
  templateUrl: './workout-past.component.html',
  styleUrls: ['./workout-past.component.css']
})
export class WorkoutPastComponent implements OnInit {

  public workouts: Array<Workout>;

  constructor(
    public acocuntRepository: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private slicePipe: SlicePipe) { }

  ngOnInit() {
    this.activedRoute.params.subscribe((params: any) => {
      this.acocuntRepository.getWorkoutPast(+params.id).subscribe(data => {
        this.workouts = data;
        for (let i = 0; i < this.workouts.length; i++) {
          this.workouts[i].date = this.slicePipe.transform(this.workouts[i].date, 0, 10);
        }
     });
   });
  }

  public updateValues() {
    this.activedRoute.params.subscribe((params: any) => {
      this.acocuntRepository.getWorkoutPast(+params.id).subscribe(data => {
        this.workouts = data;
        for (let i = 0; i < this.workouts.length; i++) {
          this.workouts[i].date = this.slicePipe.transform(this.workouts[i].date, 0, 10);
        }
     });
   });
  }
}
