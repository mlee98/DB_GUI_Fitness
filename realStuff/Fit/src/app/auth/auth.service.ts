import { Account } from './../domain/models/Account';

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import * as jwt_decode from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import jwt from 'jsonwebtoken';


export const TOKEN_NAME = 'jwt_token';

@Injectable()
export class AuthService {

  private endPoint = 'http://192.168.99.100:3000/';
  private httpOptions  = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response'
    };

  constructor(protected httpClient: HttpClient) { }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt.decode(token);

    if (decoded.exp === undefined) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {token = this.getToken(); }
    if (!token) {return true; }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {return false; }
    return !(date.valueOf() > new Date().valueOf());
  }

  public login(user: string, pass: string): Observable<any> {
    // tslint:disable-next-line:prefer-const
    let data1 = {'username' : user, 'password' : pass};
    const data = JSON.stringify(data1);
    return this.httpClient.post(`${this.endPoint}signIn`, data, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response'
    }).pipe(
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
