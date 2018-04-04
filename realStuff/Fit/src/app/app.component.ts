import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SignInComponent } from './sign-in/sign-in.component';


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
  public frontPage: boolean;

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.frontPage = true;
  }

  public changePage() {
    this.frontPage = false;
  }

}
