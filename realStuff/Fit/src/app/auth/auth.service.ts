import { Account } from './../domain/models/Account';
import * as jwt_decode from 'jwt-decode';

import { catchError } from 'rxjs/operators';
import jwt from 'jsonwebtoken';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


export const TOKEN_NAME = 'jwt_token';

@Injectable()
export class AuthService {

  private endPoint = 'http://192.168.99.100:3000/';
  private httpOptions  = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    };

  constructor(protected httpClient: HttpClient) { }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  public tokenExist() {
    if (localStorage.getItem(TOKEN_NAME)) {
      return true;
    }
    return false;
  }

  setToken(token: string): void {
    console.log('token set');
    console.log(token);
    localStorage.setItem(TOKEN_NAME, token);
    console.log(localStorage);
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
    const data = {'username' : user, 'password' : pass};
    return this.httpClient.post(`${this.endPoint}signIn`, data, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }
  public logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(TOKEN_NAME);
  }

  protected handleException(exception: any) {
    // tslint:disable-next-line:prefer-const
    let message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }
}
