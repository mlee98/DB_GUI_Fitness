import { catchError } from 'rxjs/operators';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from './models/Account';
import { Repostitory } from './repository.service';

@Injectable()
export class AccountRepostitory extends Repostitory<any> {

  protected endPoint = 'https://2e2de8ba-9af9-46bf-843c-8e68426e412e.mock.pstmn.io';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
}
