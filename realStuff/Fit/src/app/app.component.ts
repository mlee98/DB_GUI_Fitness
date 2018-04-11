import { HttpClient } from '@angular/common/http';
import {Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { Tracker } from './domain/models/tracker';

const appRoutes: Routes = [
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'sign-in',      component: SignInComponent },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private http: HttpClient) { }
  public frontPage: boolean;
  public signIn: boolean;
  public createAccount: boolean;
  public track: Tracker;

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    // tslint:disable-next-line:no-unused-expression
    this.track = {id: 0 , accounts: []};
    this.frontPage = true;
    this.signIn = false;
    this.createAccount = false;

    this.http.get('https://api.github.com/users/seeschweiler').subscribe(data => {
      console.log(data);
    });
  }

  public changeToSignIn() {
    this.frontPage = false;
    this.signIn = true;
  }

  public changeToCreateAccount() {
    this.frontPage = false;
    this.createAccount = true;
  }

}

