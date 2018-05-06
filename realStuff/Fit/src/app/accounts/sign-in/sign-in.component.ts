import { HttpHeaders } from '@angular/common/http';
import { AccountRepostitory } from '../../domain/account-repository.service';
import { Account } from '../../domain/models/Account';
import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeRepostitory } from '../../domain/home.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) {}
  @Input()
  public pass: string;
  public username: string;
  public goodLog: number;
  public accToPass: Account;
  public id: number;

  ngOnInit() {
    this.pass = '';
    this.username = '';
    this.goodLog = 0;
    this.auth.logout();
  }


  public goodLogin() {
    this.auth.login(this.username, this.pass).subscribe(data => {
       this.auth.setToken(data.token);
        if (data.id === -1) {
          this.goodLog = 1;
        } else {
          this.router.navigateByUrl('accounts/' + data.id);
        }
     });
  }

  public goToCreateAccount() {
    this.router.navigateByUrl('createAccount');
  }
}
