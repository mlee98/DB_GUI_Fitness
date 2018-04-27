import { Workout } from './models/Workouts';
import { Account } from './models/Account';
import { catchError } from 'rxjs/operators';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export abstract class Repostitory<T> {

  protected abstract endPoint;

  private httpOptions  = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : 'rkeehan'
    })
  };

  constructor(protected httpClient: HttpClient) {}

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
  public postWorkoutToday(id: number, workout: Workout): Observable<Workout> {
    return this.httpClient.post(`${this.endPoint}${id}/workoutToday`, workout, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public postWorkoutPercent(id: number, percent: number): Observable<Workout> {
    return this.httpClient.post(`${this.endPoint}${id}/workoutPercent`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public getWorkoutPast(id: number): Observable<Workout> {
    return this.httpClient.get(`${this.endPoint}${id}/workoutToday`, this.httpOptions).pipe(
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
