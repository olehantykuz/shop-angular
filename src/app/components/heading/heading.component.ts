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
  constructor(
    public userService: UserService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout(e) {
    e.preventDefault();
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  get getTotalCartItemsNumber() {
    return Object.keys(this.cartService.cart).length;
  }

}
