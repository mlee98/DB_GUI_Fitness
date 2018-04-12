import { AccountRepostitory } from '../../domain/account-repository.service';
import { Account } from '../../domain/models/Account';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(
    private accountRepository: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) {}
  @Input()
  public pass: string;
  public username: string;
  public goodLog: number;
  public accToPass: Account;

  ngOnInit() {
    this.pass = '';
    this.username = '';
    this.goodLog = 0;
  }


  public goodLogin() {
    this.accountRepository.login(this.username, this.pass).subscribe(data => {
      console.log(data);
       if (data[0].success === true) {
        this.router.navigateByUrl('account/' + data[0].id);
       }
    });
  }
}
