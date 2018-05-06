import { Account } from './../../../domain/models/Account';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountRepostitory } from '../../../domain/account-repository.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    public accountRepository: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) { }

  public userAcc: Account;
  public searchAcc: Account;
  public resultList: Array<Account>;
  public resultAcc: Account;
  public resultPicked: boolean;

  ngOnInit() {
     this.resultPicked = false;
     this.userAcc = {};
     this.activedRoute.params.subscribe((params: any) => {
      this.accountRepository.getAcc(+params.id).subscribe(data => {
         this.userAcc = data;
      });
     });
     this.resultList = [];
     this.searchAcc = {};
     this.resultAcc = {};
  }

  public search() {
    this.activedRoute.params.subscribe((params: any) => {
      this.accountRepository.search(+params.id, this.searchAcc).subscribe(data => {
        this.resultList = data;
     });
   });
  }

  public goToSearchProfile(result: Account) {
    this.resultAcc = result;
    this.accountRepository.getAcc(this.resultAcc.id).subscribe(data => {
      this.resultAcc = data;
      this.resultPicked = true;
   });
  }

  public reset() {
    this.searchAcc = {};
    this.resultList = [];
  }

  public backToProfile() {
    this.router.navigateByUrl('accounts/' + this.userAcc.id );
  }
}
