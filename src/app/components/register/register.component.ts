import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegisterData } from '../../core/types/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', RegisterData.rules.email],
      password: ['', RegisterData.rules.password],
      name: ['', RegisterData.rules.name]
    });
  }

  get form() {
    return this.registerForm.controls;
  }

  register(e) {
    e.preventDefault();
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const data = JSON.stringify(this.registerForm.value) as RegisterData;
    this.userService.register(data)
      .subscribe(response => {
        if (response) {
          this.registerForm.reset();
          this.submitted = false;
          this.router.navigate(['/']);
        } else {
          alert('Something went wrong');
        }
      });
  }
}
