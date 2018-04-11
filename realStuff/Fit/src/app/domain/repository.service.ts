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

  public get(): Observable<T[]> {
    return this.httpClient.get(`${this.endPoint}`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public login(user: string, pass: string): Observable<T[]> {
    // tslint:disable-next-line:prefer-const
    let data = {username: user, password: pass};
    return this.httpClient.post(`${this.endPoint}`, data, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public profile(id: number): Observable<T[]> {
    return this.httpClient.get(`${this.endPoint}/${id}`,  this.httpOptions).pipe(
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
