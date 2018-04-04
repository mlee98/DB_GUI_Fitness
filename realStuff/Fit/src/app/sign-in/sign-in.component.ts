import { Component, OnInit, Input } from '@angular/core';
import { Tracker } from '../domain/models/tracker';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor() {}
  @Input() public track: Tracker;
  public pass: string;
  public username: string;
  public goodLog: number;

  ngOnInit() {
    this.pass = '';
    this.username = '';
    this.goodLog = 0;
  }
  public goodLogin() {
    for (let i = 0; i < this.track.accounts.length; i++) {
      if (
        this.track.accounts[i].password === this.pass &&
        this.track.accounts[i].username === this.username
      ) {
        this.goodLog = 2;
        return;
      }
    }
    this.goodLog = 1;
  }
}
