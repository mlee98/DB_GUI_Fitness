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

    pieChartOptions = {
      responsive: true
    };
    pieChartLabels =  ['Core', 'Arms', 'Legs', 'Cardio'];

    // CHART COLOR.
    pieChartColor: any = [
        {
            backgroundColor: ['rgba(30, 169, 224, 0.8)',
            'rgba(255,165,0,0.9)',
            'rgba(139, 136, 136, 0.9)',
            'rgba(255, 161, 181, 0.9)'
            ]
        }
    ];

    pieChartData: any = [
      {
          data: []
      }
    ];
    public corePercent: number;
    public armsPercent: number;
    public legsPercent: number;
    public cardioPercent: number;

  ngOnInit() {
    this.corePercent = 0;
    this.armsPercent = 0;
    this.legsPercent = 0;
    this.cardioPercent = 0;
    this.activedRoute.params.subscribe((params: any) => {
      this.acocuntRepository.getWorkoutPast(+params.id).subscribe(data => {
        this.workouts = data;
        console.log(this.workouts);
        for (let i = 0; i < this.workouts.length; i++) {
          if (this.workouts[i].type === 'Core') {
            this.corePercent++;
          } else if (this.workouts[i].type === 'Arms') {
            this.armsPercent++;
          } else if (this.workouts[i].type === 'Legs') {
            this.legsPercent++;
          } else {
            this.cardioPercent++;
          }
         }
         this.pieChartData = [{'data': [this.corePercent, this.armsPercent, this.legsPercent, this.cardioPercent] }];
     });
   });
  }

}
