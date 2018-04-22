import { catchError } from 'rxjs/operators';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from './models/Account';
import { Repostitory } from './repository.service';

@Injectable()
export class AccountRepostitory extends Repostitory<Account> {

  protected endPoint = '192.168.99.100:3000/';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
}
