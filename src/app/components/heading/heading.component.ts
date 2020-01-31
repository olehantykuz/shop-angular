import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {
  user = this.userService.getAccount();

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  account() {
    return this.user = this.userService.user;
  }

}
