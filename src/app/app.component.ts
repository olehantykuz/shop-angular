import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Super shop';

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    if (this.userService.token) {
      this.userService.getUser().subscribe();
    }
  }

}
