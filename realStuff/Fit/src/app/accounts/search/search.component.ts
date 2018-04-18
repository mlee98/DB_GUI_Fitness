import { Account } from './../../domain/models/Account';
import { Component, OnInit } from '@angular/core';
import { AccountRepostitory } from '../..';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    public accountRepository: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) { }

  public userAcc: Account;
  public searchAcc: Account;
  public resultList: Array<Account>;
  public fakeAcc: Account;

  ngOnInit() {
    // this.activedRoute.params.subscribe((params: any) => {
    //  this.accountRepository.getAcc(+params.id).subscribe(data => {
        // this.userAcc = data;
    //  });
    // });
    this.searchAcc = this.userAcc;
    this.resultList = [];
    this.fakeAcc = {};
    this.fakeAcc.age = 25;
    this.fakeAcc.height = '10';
    this.fakeAcc.name = 'Rob';
    this.fakeAcc.weight = '195';
    this.fakeAcc.disabilities = [];
    this.fakeAcc.calsBurned = [];
    this.fakeAcc.calsEaten = [];
    this.resultList.push(this.fakeAcc);
    this.resultList.push(this.fakeAcc);
    console.log(this.resultList);
  }

  public search() {
     this.accountRepository.search(this.searchAcc).subscribe(data => {
        // this.resultList = data;
     });
  }
}
