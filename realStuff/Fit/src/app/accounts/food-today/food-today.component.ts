import { Component, OnInit } from '@angular/core';
import { SlicePipe, DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountRepostitory } from '../../domain/account-repository.service';
import { Meal } from '../../domain/models/Meal';


@Component({
  selector: 'app-food-today',
  templateUrl: './food-today.component.html',
  styleUrls: ['./food-today.component.css']
})
export class FoodTodayComponent implements OnInit {

<<<<<<< HEAD
  constructor() {}

  ngOnInit() {

=======
  constructor(
    public acocuntRepository: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private slicePipe: SlicePipe) {}

    public date: string;
    public meal: Meal;

  ngOnInit() {
    this.meal = {};
    const obj = new Date();
    this.date = this.datePipe.transform(obj, 'yyyy-MM-dd');
    this.updateValues();
  }

  public updateValues() {
    this.activedRoute.params.subscribe((params: any) => {
      this.acocuntRepository.getMealToday(+params.id, this.date.toString()).subscribe(data => {
        this.meal = data;
     });
   });
>>>>>>> 0ee66fcc500992fa5ca506961d4ca2ce1e518dd6
  }
}
