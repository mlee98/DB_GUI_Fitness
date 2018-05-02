import { Account } from './../domain/models/Account';
import * as jwt_decode from 'jwt-decode';
import { catchError } from 'rxjs/operators';
import jwt from 'jsonwebtoken';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';


export const TOKEN_NAME = 'jwt_token';

@Injectable()
export class AuthService {
  public token: string;

  constructor(private http: HttpClient,
    private activedRoute: ActivatedRoute,
    private router: Router) {
      // set token if saved in local storage
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string): Observable<boolean> {
      return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
          .map((response: Response) => {
              // login successful if there's a jwt token in the response
              const token = response.headers.get('authentication');
              console.log(token);
              if (token) {
                  // set token property
                  this.token = token;

                  // store username and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify({token: token }));
                  this.router.navigateByUrl('accounts/' + response.json.arguments['id']);
                  // return true to indicate successful login
                  return true;
              } else {
                  // return false to indicate failed login
                  return false;
              }
          });
  }

  logout(): void {
      // clear token remove user from local storage to log user out
      this.token = null;
      localStorage.removeItem('currentUser');
  }
  protected handleException(exception: any) {
    // tslint:disable-next-line:prefer-const
    let message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }
}
