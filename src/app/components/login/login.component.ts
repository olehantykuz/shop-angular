import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  isLoggedIn: boolean = this.userService.isLoggedIn();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]]
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

    const data = JSON.stringify(this.loginForm.value) as LoginData;
    this.userService.login(data)
      .subscribe();

  }
}
