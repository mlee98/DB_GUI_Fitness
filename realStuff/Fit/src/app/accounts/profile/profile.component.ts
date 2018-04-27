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
      const num = params['id'];
      this.acocuntRepository.getAcc(num).subscribe(data => {
        console.log('id in profile' + +params.id);
        console.log('id in profile' + params['id']);
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

