import { FoodTodayComponent } from './../tabs/food-today/food-today.component';
import { Account } from '../../domain/models/Account';
import { Component, OnInit, Input } from '@angular/core';
import { AccountRepostitory } from '../../domain/account-repository.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    public acocuntRepository: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) { }

  public acc: Account;

  ngOnInit() {
      this.activedRoute.params.subscribe((params: any) => {
      this.acocuntRepository.getAcc(+params.id).subscribe(data => {
        this.acc = data;
      });
    });
  }


  public changeToSignIn() {
   this.router.navigateByUrl('signIn');
  }

  public changeToSearch() {
  this.router.navigateByUrl('accounts/' + this.acc.id + '/search');
   }
}

