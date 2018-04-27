import { FoodTodayComponent } from './../food-today/food-today.component';
import { Account } from '../../domain/models/Account';
import { Component, OnInit, Input } from '@angular/core';
import { AccountRepostitory } from '../../domain/account-repository.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    public acocuntRepository: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) { }

  public acc: Account;

  ngOnInit() {
    this.activedRoute.params.subscribe((params: any) => {
      this.acocuntRepository.getAcc(+params.id).subscribe(data => {
        console.log(+params.id);
        this.acc = data;
      });
    });
  }


  public changeToSignIn() {
   this.router.navigateByUrl('signIn');
  }

  public changeToSearch() {
 this.router.navigateByUrl('/account/1/search');
   }
}

