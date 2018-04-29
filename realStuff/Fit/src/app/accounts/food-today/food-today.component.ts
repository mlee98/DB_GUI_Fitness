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

  constructor(
    public acocuntRepository: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private slicePipe: SlicePipe) {}

    public date: Date;
    public meal: Meal;

  ngOnInit() {
    this.meal = {};
    this.date = new Date();
    this.updateValues();
  }

  public updateValues() {
    this.activedRoute.params.subscribe((params: any) => {
      this.acocuntRepository.getMealToday(+params.id, this.date.toString()).subscribe(data => {
        this.meal = data;
     });
   });
  }
}
