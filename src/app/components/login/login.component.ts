import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginData } from '../../core/types/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', LoginData.rules.email],
      password: ['', LoginData.rules.password]
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  login(e) {
    e.preventDefault();
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const data = this.loginForm.value as LoginData;
    this.userService.login(data)
      .subscribe(response => {
        if (response) {
          this.loginForm.reset();
          this.submitted = false;
          this.router.navigate(['/']);
        } else {
          alert('Invalid email or password');
        }
      });

  }
}
