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
  ) { }
  public acc: Account;

  ngOnInit() {
    this.acc = {};
    this.acc.disabilities = [];
    this.acc.calsBurned = [];
    this.acc.calsEaten = [];
  }
  public addAcc() {
    this.acocuntRepository.createAccount(this.acc).subscribe(data => {
        this.router.navigateByUrl('signIn');
    });
  }
}
