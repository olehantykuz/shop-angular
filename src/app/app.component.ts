import {Component, OnDestroy, OnInit} from '@angular/core';
import { UserService } from './services/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Super shop';
  subscription: Subscription;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    if (this.userService.token) {
      this.subscription =  this.userService.getUser().subscribe();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
