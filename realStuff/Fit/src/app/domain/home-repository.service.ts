import { Workout } from './models/Workouts';
import { Account } from './models/Account';
import { catchError } from 'rxjs/operators';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export abstract class HRepostitory<T> {

  protected abstract endPoint;

  private httpOptions  = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : 'rkeehan'
    })
  };

  constructor(protected httpClient: HttpClient) {}
  public get(): Observable<T> {
    return this.httpClient.get(`${this.endPoint}`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public createAccount(acc: Account): Observable<T[]> {
    const data = acc;
    return this.httpClient.post(`${this.endPoint}createAccount`, data, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public login(user: string, pass: string): Observable<Account> {
    // tslint:disable-next-line:prefer-const
    let data1 = {'username' : user, 'password' : pass};
    const data = JSON.stringify(data1);
    return this.httpClient.post(`${this.endPoint}signIn`, data, this.httpOptions).pipe(
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
