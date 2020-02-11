import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegisterData } from '../../core/types/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup(
      {
        email: new FormControl('', RegisterData.rules.email),
        password: new FormControl('', RegisterData.rules.password),
        name: new FormControl('', RegisterData.rules.name)
      }
    );
  }

  register(e) {
    e.preventDefault();

    console.log(this.form, this.form.invalid)

    if (this.form.invalid) {
      return;
    }

    const data = this.form.value as RegisterData;
    this.userService.register(data)
      .subscribe(response => {
        if (response) {
          this.form.reset();
          this.router.navigate(['/']);
        } else {
          alert('Something went wrong');
        }
      });
  }
}
