import { AuthService } from './../auth/auth.service';
import { catchError } from 'rxjs/operators';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from './models/Account';
import { Repostitory } from './acc-repository.service';

@Injectable()
export class AccountRepostitory extends Repostitory<any> {

  protected endPoint = 'http://192.168.99.100:3000/accounts/';

  constructor(protected httpClient: HttpClient,
  protected auth: AuthService) {
    super(httpClient, auth);
  }
}
