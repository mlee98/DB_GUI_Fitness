import { Account } from '../../domain/models/Account';
import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'protractor';
import { AccountRepostitory } from '../../domain/account-repository.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  constructor(
    public acocuntRepository: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) {}
  public acc: Account;
  public missingFields: boolean;

  ngOnInit() {
    this.acc = {};
    this.acc.disabilities = [];
    this.acc.calsBurned = [];
    this.acc.calsEaten = [];
    this.acc.username = '';
    this.acc.goal = '';
    this.acc.age = 0;
    this.acc.height = '';
    this.acc.name = '';
    this.acc.password = '';
    this.acc.username = '';
    this.acc.weight = '';
    this.missingFields = false;
  }
  public addAcc() {
    if (this.missingFields === false) {
      this.acocuntRepository.createAccount(this.acc).subscribe(data => {
        this.router.navigateByUrl('signIn');
      });
    }
  }
  public submitCheck() {
    if (
      // this.acc.age === 0 ||
      this.acc.username === '' ||
      this.acc.goal === '' ||
      this.acc.height === '' ||
      this.acc.name === '' ||
      this.acc.password === '' ||
      this.acc.username === '' ||
      this.acc.weight === ''
    ) {
      return false;
    }
    return true;
  }
}
