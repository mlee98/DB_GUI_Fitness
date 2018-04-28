import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { InputComponent } from './input/input.component';
import { WorkoutComponent } from './workout/workout.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ACCOUNTS_ROUTES } from './account-routes';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FoodTodayComponent } from './food-today/food-today.component';
import { SearchComponent } from './search/search.component';
import { WorkoutTodayComponent } from './workout-today/workout-today.component';
import { WorkoutPastComponent } from './workout-past/workout-past.component';
import { FoodPastComponent } from './food-past/food-past.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ACCOUNTS_ROUTES)
  ],
  declarations: [
    SignInComponent,
    CreateAccountComponent,
    ProfileComponent,
    InputComponent,
    WorkoutComponent,
    HomepageComponent,
    FoodTodayComponent,
    SearchComponent,
    WorkoutTodayComponent,
    WorkoutPastComponent,
    FoodPastComponent

  ],
  exports: [
      HomepageComponent
  ]
})

export class AccountModule { }
