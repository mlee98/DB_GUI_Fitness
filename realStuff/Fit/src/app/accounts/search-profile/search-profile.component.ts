import { FoodTodayComponent } from './../food-today/food-today.component';
import { Account } from '../../domain/models/Account';
import { Component, OnInit, Input } from '@angular/core';
import { AccountRepostitory } from '../../domain/account-repository.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-search-profile',
  templateUrl: './search-profile.component.html',
  styleUrls: ['./search-profile.component.css']
})
export class SearchProfileComponent implements OnInit {

  constructor(
    public acocuntRepository: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) { }

  @Input() public acc: Account;

  @Input() public searcher: Account;

  ngOnInit() {
    console.log(this.acc);
    console.log(this.searcher);
  }


  public changeToProfile() {
   this.router.navigateByUrl('accounts/' + this.acc.id);
  }

  public changeToSearch() {
 this.router.navigateByUrl('accounts/' + this.acc.id + '/search');
   }
}

