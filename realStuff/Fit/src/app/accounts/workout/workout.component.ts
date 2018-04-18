import { Component, OnInit } from '@angular/core';
import { AccountRepostitory } from '../../domain/account-repository.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  constructor(
    public acocuntRepository: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) { }
  public acc: Account;

  ngOnInit() {
  }

  public goBackToProfile() {
    this.router.navigateByUrl('account/' + 1);
  }

}
