import { Validators } from '@angular/forms';

export class LoginData {
  static rules = {
    email: [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
    password: [Validators.required, Validators.minLength(8)]
  };

  email: string;
  password: string;
}

export class RegisterData extends LoginData {
  static rules = Object.assign({}, LoginData.rules, {name: [Validators.required]});

  name: string;
}

export class User {
  id: number;
  email: string;
  name: string | null;
}
