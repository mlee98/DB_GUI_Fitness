import { Component, OnInit } from '@angular/core';
import { Meal } from '../../domain/models/Meal';
import { AccountRepostitory } from '../../domain/account-repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-food-past',
  templateUrl: './food-past.component.html',
  styleUrls: ['./food-past.component.css']
})
export class FoodPastComponent implements OnInit {


  constructor(
    public acocuntRepository: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private slicePipe: SlicePipe) { }

    public meals: Array<Meal>;

    public tempMeal: Meal;

  ngOnInit() {
    this.updateValues();
  }

  public updateValues() {
    this.activedRoute.params.subscribe((params: any) => {
      this.acocuntRepository.getMealPast(+params.id).subscribe(data => {
        this.meals = data;
     });
   });
  }

}
