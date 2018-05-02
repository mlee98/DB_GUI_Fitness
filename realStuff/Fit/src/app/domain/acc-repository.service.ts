import { Workout } from './models/Workouts';
import { Account } from './models/Account';
import { catchError } from 'rxjs/operators';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Meal } from './models/Meal';
import { AuthService } from '../auth/auth.service';

export abstract class Repostitory<T> {

  protected abstract endPoint;

  constructor(protected httpClient: HttpClient,
  private auth: AuthService) {}
  private httpOptions  = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization':  this.auth.getToken()
    })
  };


  public getAcc(id: number): Observable<Account> {
    return this.httpClient.get(`${this.endPoint}${id}`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }
  public getWorkoutToday(id: number): Observable<Workout[]> {
    return this.httpClient.get(`${this.endPoint}${id}/workoutToday`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public getMealToday(id: number, date: string): Observable<Meal> {
    console.log(date);
    const data = {'date': date};
    return this.httpClient.post(`${this.endPoint}${id}/mealToday`, data, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public getMealPast(id: number): Observable<Meal[]> {
    return this.httpClient.get(`${this.endPoint}${id}/mealPast`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public postWorkoutToday(id: number, workout: Workout): Observable<Workout> {
    const data = {'workout': workout};
    return this.httpClient.post(`${this.endPoint}${id}/workoutToday`, data, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public postWorkoutPercent(id: number, percent: number, workout: Workout): Observable<Workout> {
    console.log(percent);
    const data = {'workout': workout, 'todo': percent};
    console.log(data);
    return this.httpClient.post(`${this.endPoint}${id}/workoutProgress`, data, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public getWorkoutPast(id: number): Observable<Workout[]> {
    return this.httpClient.get(`${this.endPoint}${id}/pastWorkoutList`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public search(id: number, account: Account): Observable<Account[]> {
    // tslint:disable-next-line:prefer-const
    return this.httpClient.post(`${this.endPoint}${id}/search`, account, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }


  protected handleException(exception: any) {
    // tslint:disable-next-line:prefer-const
    let message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }

}
