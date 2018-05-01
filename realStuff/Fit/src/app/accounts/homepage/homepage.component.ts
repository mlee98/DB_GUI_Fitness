import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { AccountRepostitory } from '../../domain/account-repository.service';

@Component({
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  // tslint:disable-next-line:no-shadowed-variable
  constructor(
    public acocuntRepository: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) { }
  public frontPage: boolean;
  public signIn: boolean;
  public createAccount: boolean;

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    // tslint:disable-next-line:no-unused-expression
    this.frontPage = true;
    this.signIn = false;
    this.createAccount = false;
  }

  public changeToSignIn() {
    this.router.navigateByUrl('signIn1');
  }

  public changeToCreateAccount() {
    this.router.navigateByUrl('createAccount');
  }

}
