import { Component, OnInit, Input } from '@angular/core';
import { Meal } from '../../../domain/models/Meal';
import { AccountRepostitory } from '../../../domain/account-repository.service';
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
    @Input() public accNum: number;

  ngOnInit() {
    this.meals = [];
    this.updateValues();
  }

  public updateValues() {
   if (!this.accNum) {
    this.activedRoute.params.subscribe((params: any) => {
      this.acocuntRepository.getMealPast(+params.id).subscribe(data => {
        this.meals = data;
        for (let i = 0; i < this.meals.length; i++) {
          this.meals[i].date = this.slicePipe.transform(this.meals[i].date, 0, 10);
        }
        this.meals.reverse();
     });
   });
  } else {
    this.acocuntRepository.getMealPast(this.accNum).subscribe(data => {
      this.meals = data;
      for (let i = 0; i < this.meals.length; i++) {
        this.meals[i].date = this.slicePipe.transform(this.meals[i].date, 0, 10);
      }
      this.meals.reverse();
   });
  }
  }

}
