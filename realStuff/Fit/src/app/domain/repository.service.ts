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

  public get(): Observable<T> {
    return this.httpClient.get(`${this.endPoint}`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public getAcc(id: number): Observable<T> {
    return this.httpClient.get(`${this.endPoint}/accounts/${id}`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public login(user: string, pass: string): Observable<T> {
    // tslint:disable-next-line:prefer-const
    let data1 = {'username' : user, 'password' : pass};
    const data = JSON.stringify(data1);
    return this.httpClient.post(`${this.endPoint}/signIn`, data, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }
  public search(account: Account): Observable<T> {
    // tslint:disable-next-line:prefer-const
    return this.httpClient.post(`${this.endPoint}/search`, account, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }


  public createAccount(acc: Account): Observable<T[]> {
    const data = acc;
    return this.httpClient.post(`${this.endPoint}/createAccount`, data, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }


  public addCals(calEaten: number, calsBurned: number, id: number): Observable<T[]> {
    const data = {};
    return this.httpClient.post(`${this.endPoint}/account/${id}/Cals`, data, this.httpOptions).pipe(
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
