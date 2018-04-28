import { Component, OnInit } from '@angular/core';
import { Workout } from '../../domain/models/Workouts';
import { AccountRepostitory } from '../../domain/account-repository.service';
import { Router, ActivatedRoute } from '@angular/router';


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
    private router: Router) { }

  ngOnInit() {
    this.activedRoute.params.subscribe((params: any) => {
      this.acocuntRepository.getWorkoutPast(+params.id).subscribe(data => {
        this.workouts = data;
        console.log(this.workouts);
     });
   });

  }

}
