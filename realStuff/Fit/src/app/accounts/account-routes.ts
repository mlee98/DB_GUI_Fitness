import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';
import { InputComponent } from './input/input.component';
import { WorkoutComponent } from './workout/workout.component';
import { SearchComponent } from './search/search.component';
export const ACCOUNTS_ROUTES: Route[] = [
  {
    path: 'homepage',
    component: HomepageComponent
  },
  {
    path: 'signIn',
    component: SignInComponent
  },
  {
    path: 'createAccount',
    component: CreateAccountComponent
  },
  {
    path: 'accounts/:accountId',
    component: ProfileComponent
  },
  {
    path: 'accounts/:accountId/input',
    component: InputComponent
  },
  {
    path: 'accounts/:accountId/workout',
    component: WorkoutComponent
  },
  {
    path: 'accounts/:accountId/search',
    component: SearchComponent
  }
];
