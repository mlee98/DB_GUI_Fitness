import { Account } from './../domain/models/Account';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  @Input() acc: Account;

  ngOnInit() {
  }

  public netCals() {
    return (this.acc.calsEaten[0] - this.acc.calsBurned[0]);
  }

}
