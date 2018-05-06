import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ACCOUNTS_ROUTES } from './account-routes';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FoodTodayComponent } from './tabs/food-today/food-today.component';
import { SearchComponent } from './searchFolder/search/search.component';
import { WorkoutTodayComponent } from './tabs/workout-today/workout-today.component';
import { WorkoutPastComponent } from './tabs/workout-past/workout-past.component';
import { FoodPastComponent } from './tabs/food-past/food-past.component';
import { ChartsModule } from 'ng2-charts';
import { PieComponent } from './tabs/pie/pie.component';
import { SearchProfileComponent } from './searchFolder/search-profile/search-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ACCOUNTS_ROUTES),
    ChartsModule
  ],
  declarations: [
    SignInComponent,
    CreateAccountComponent,
    ProfileComponent,
    HomepageComponent,
    FoodTodayComponent,
    SearchComponent,
    WorkoutTodayComponent,
    WorkoutPastComponent,
    FoodPastComponent,
    PieComponent,
    SearchProfileComponent

  ],
  exports: [
      HomepageComponent
  ]
})

export class AccountModule { }
