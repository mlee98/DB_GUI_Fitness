import { Component, OnInit } from '@angular/core';
import { Meal } from '../../domain/models/Meal';
import { AccountRepostitory } from '../../domain/account-repository.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-food-past',
  templateUrl: './food-past.component.html',
  styleUrls: ['./food-past.component.css']
})
export class FoodPastComponent implements OnInit {

  public meals: Array<Meal>;

  public tempMeal: Meal;

  constructor(
    public acocuntRepository: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.meals = [];
    this.tempMeal = {};
    this.tempMeal.id = 1;
    this.tempMeal.breakfast = 'waffle';
    this.tempMeal.lunch = 'hot dog';
    this.tempMeal.snack = 'apple';
    this.tempMeal.dinner = 'steak';
    this.tempMeal.date = new Date;
    this.meals.push(this.tempMeal);
  }

}
