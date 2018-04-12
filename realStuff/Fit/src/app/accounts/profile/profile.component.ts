import { Account } from '../../domain/models/Account';
import { Component, OnInit, Input } from '@angular/core';
import { AccountRepostitory } from '../../domain/account-repository.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    public acocuntRepository: AccountRepostitory
  ) { }
  @Input() acc: Account;

  ngOnInit() {
    this.acocuntRepository.profile(this.acc.id).subscribe(data => {
        this.acc = data[0];
    });
  }
}
