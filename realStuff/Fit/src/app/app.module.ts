import { HomeRepostitory } from './domain/home.service';
import { AccountRepostitory } from './domain/account-repository.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AccountModule } from './accounts/account.module';
import { DatePipe, SlicePipe } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'homepage', pathMatch: 'full' }
    ]),
    FormsModule,
    HttpClientModule,
    AccountModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [
    AccountRepostitory,
    HomeRepostitory,
    DatePipe,
    SlicePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
