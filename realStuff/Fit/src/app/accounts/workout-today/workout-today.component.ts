import { Workout } from './../../domain/models/Workouts';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountRepostitory } from '../../domain/account-repository.service';

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
  ngOnInit() {
    this.workouts = [];
    this.activedRoute.params.subscribe((params: any) => {
        this.acocuntRepository.getWorkoutToday(+params.id).subscribe(data => {
          this.workouts = data;
       });
     });
  }

}
