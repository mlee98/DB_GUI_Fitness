import { Account } from './../../domain/models/Account';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountRepostitory } from '../../domain/account-repository.service';
import { AuthService } from '../../auth/auth.service';

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
    if (!this.auth.tokenExist() ) {
      console.log('redirecting');
      this.router.navigateByUrl('signIn');
    }
     this.resultPicked = false;
     this.userAcc = {};
     this.activedRoute.params.subscribe((params: any) => {
      this.accountRepository.getAcc(+params.id).subscribe(data => {
        if ( data.token === 0) {
          this.router.navigateByUrl('signIn');
        }
         this.userAcc = data;
      });
     });
     this.resultList = [];
     this.searchAcc = {};
     this.resultAcc = {};
    /* this.userAcc.id = 1;
    this.searchAcc = this.userAcc;
    this.resultList = [];
    this.fakeAcc = {};
    this.fakeAcc.age = 25;
    this.fakeAcc.height = 10;
    this.fakeAcc.fName = 'Rob';
    this.fakeAcc.lName = 'K';
    this.fakeAcc.weight = '195';
    this.fakeAcc.allergies = [];
    this.fakeAcc.calsBurned = [];
    this.fakeAcc.calsEaten = [];
    this.resultList.push(this.fakeAcc);
    this.resultList.push(this.fakeAcc);*/
    console.log(this.resultList);
  }

  public search() {
    console.log('search info');
    console.log(this.searchAcc);
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
      console.log('this is sent to search prfoile');
      console.log(this.resultAcc);
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
