import { Account } from './../domain/models/Account';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Tracker } from '../domain/models/tracker';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor() { }
  public acc: Account;
  @Input() public track: Tracker;
  public signIn: boolean;
  public createAcc: boolean;

  ngOnInit() {
    this.acc = {};
    this.acc.disabilities = [];
    this.acc.calsBurned = [500];
    this.acc.calsEaten = [800];
    this.signIn = false;
    this.createAcc = true;
  }
  public addAcc() {
    this.track.accounts.push(this.acc);
    this.acc = {};
  }
  public goToSignIn() {
    this.signIn = true;
    this.createAcc = false;
  }
}
