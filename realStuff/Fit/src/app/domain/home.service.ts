import { HRepostitory } from './home-repository.service';
import { catchError } from 'rxjs/operators';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from './models/Account';
@Injectable()
export class HomeRepostitory extends HRepostitory<any> {

  protected endPoint = 'http://192.168.99.100:3000/';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
}
