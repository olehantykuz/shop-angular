import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {
  user = this.userService.getAccount();

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  account() {
    return this.user = this.userService.user;
  }

  logout(e) {
    e.preventDefault();
    this.userService.logout().subscribe(response => {
      this.router.navigate(['login']);
    });
  }

}
