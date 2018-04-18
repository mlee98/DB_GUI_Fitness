import { AccountRepostitory } from './domain/account-repository.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AccountModule } from './accounts/account.module';
import { FoodTodayComponent } from './food-today/food-today.component';

@NgModule({
  declarations: [
    AppComponent,
    FoodTodayComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'homepage', pathMatch: 'full' }
    ]),
    FormsModule,
    HttpClientModule,
    AccountModule
  ],
  providers: [
    AccountRepostitory
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
