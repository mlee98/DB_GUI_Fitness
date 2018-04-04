import { ProfileComponent } from './profile/profile.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { CreateAccountComponent } from './create-account/create-account.component';

const appRoutes: Routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: 'create-account', component: CreateAccountComponent},
  {path: 'profile', component: ProfileComponent}
  ];
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    CreateAccountComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
