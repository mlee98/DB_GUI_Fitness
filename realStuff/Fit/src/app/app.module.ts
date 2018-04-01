import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { CreateAccountComponent } from './create-account/create-account.component';

const appRoutes: Routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: 'create-account', component: CreateAccountComponent},
  ];
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    CreateAccountComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
