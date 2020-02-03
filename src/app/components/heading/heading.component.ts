import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {
  user = this.userService.getAccount();

  constructor(
    private userService: UserService,
    private cartService: CartService,
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

  getTotalCartItemsNumber() {
    return this.cartService.items.length;
  }

}
