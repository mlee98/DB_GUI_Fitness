import { Component, OnInit } from '@angular/core';
import { AccountRepostitory } from '../../domain/account-repository.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../domain/models/Account';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  constructor(
    public acocuntRepository: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) { }
  public acc: Account;
  public calsEaten: number;
  public calsBurned: number;

  ngOnInit() {
  }

  public updateCals() {
    this.acocuntRepository.addCals(this.calsEaten, this.calsBurned, this.acc.id).subscribe(data => {
      if (data[0].id > 0) {
        this.router.navigateByUrl('account/' + data[0].id);
      }
    });
  }

}
