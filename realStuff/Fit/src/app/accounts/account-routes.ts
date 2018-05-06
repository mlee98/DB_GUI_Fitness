import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './searchFolder/search/search.component';
import { SearchProfileComponent } from './searchFolder/search-profile/search-profile.component';
import { AuthGuard } from '../auth/authGuard';

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
    path: 'accounts/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'accounts/:id/search',
    component: SearchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'accounts/:id/search/:searchId',
    component: SearchProfileComponent,
    canActivate: [AuthGuard]
  }
];
