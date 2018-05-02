import { HttpHeaders } from '@angular/common/http';
import { Account } from '../../domain/models/Account';
import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'protractor';
import { AccountRepostitory } from '../../domain/account-repository.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HomeRepostitory } from '../../domain/home.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  constructor(
    public HomeRepository: HomeRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private form: FormBuilder,
  ) {}
  public ngForm: FormGroup;
  public acc: Account;
  public email: string;
  public passwordsSame: boolean;
  public passwordMatch: string;

  ngOnInit() {
    this.passwordMatch = '';
    this.passwordsSame = true;
    this.email = '';
    this.acc = {};
    this.acc.allergies = [];
    this.acc.calsBurned = [];
    this.acc.calsEaten = [];
    this.acc.username = '';
    this.acc.goal = '';
    this.acc.fName = '';
    this.acc.lName = '';
    this.acc.password = '';
    this.acc.username = '';
    this.acc.weight = '';
    this.acc.gender = '';
  }
  public addAcc() {
    this.passCheck(this.acc.password, this.passwordMatch);
    if (!this.passwordsSame) {
      return;
    }
    console.log(this.acc);
      this.HomeRepository.createAccount(this.acc).subscribe(data => {
        console.log(this.acc);
        this.router.navigateByUrl('signIn');
      });
  }

  public goToSignIn() {
    this.router.navigateByUrl('signIn');
  }

  public submitCheck() {
    if (
      this.acc.age === 0 ||
      this.acc.username === '' ||
      this.acc.goal === '' ||
      this.acc.height === 0 ||
      this.acc.fName === '' ||
      this.acc.lName === '' ||
      this.acc.password === '' ||
      this.acc.username === '' ||
      this.acc.weight === ''
    ) {
      return true;
    }
    return false;
  }

  public passCheck(pass1: string, pass2: string) {
    if (pass1 === pass2) {
      this.passwordsSame = true;
    } else {
      this.passwordsSame = false;
    }
  }
}
