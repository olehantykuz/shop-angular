import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginData } from '../../core/types/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
        email: new FormControl('', LoginData.rules.email),
        password: new FormControl('', LoginData.rules.password)
    });
  }

  login(e) {
    e.preventDefault();
    if (this.form.invalid) {
      return;
    }

    const data = this.form.value as LoginData;
    this.userService.login(data)
      .subscribe(response => {
        if (response) {
          this.form.reset();
          this.router.navigate(['/']);
        } else {
          alert('Invalid email or password');
        }
      });

  }
}
