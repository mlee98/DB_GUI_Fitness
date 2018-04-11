import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { CreateAccountComponent, ProfileComponent, SignInComponent } from '.';
import { InputComponent } from './input/input.component';
import { WorkoutComponent } from './workout/workout.component';

export const ACCOUNTS_ROUTES: Route[] = [
  {
    path: 'signIn',
    component: SignInComponent
  },
  {
    path: 'createAccount',
    component: CreateAccountComponent
  },
  {
      path: 'account/:accountId',
      component: ProfileComponent
  },
  {
      path: 'accounts/:accountId/input',
      component: InputComponent
  },
  {
      path: 'accounts/:accountId/workout',
      component: WorkoutComponent
  }
];
