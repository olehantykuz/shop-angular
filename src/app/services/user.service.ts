import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { serverErrorHandle } from '../core/helpers/error-hadle';
import { LoginData, RegisterData, User } from '../core/types/models/user';
import { AuthResponse } from '../core/types/requests/auth-response';
import { environment } from '../../environments/environment';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token = JSON.parse(window.localStorage.getItem('authToken'));
  baseAuthUrl = environment.baseUrl + '/auth';
  user: User | null;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  isLoggedIn() {
    return Boolean(this.token);
  }

  authHeader() {
    const header = this.token ? { Authorization: 'Bearer ' + JSON.parse(window.localStorage.getItem('authToken')) } : {};

    return {
      headers: new HttpHeaders(header)
    };
  }

  getAccount() {
    return this.user;
  }

  login(data: LoginData) {
    const url = this.baseAuthUrl + '/login';

    return this.http.post<AuthResponse>(url, data, this.httpOptions).pipe(
      tap(response => {
        this.authorise(response);
      }),
      catchError(serverErrorHandle<AuthResponse>())
    );
  }

  register(data: RegisterData) {
    const url = this.baseAuthUrl + '/register';

    return this.http.post<AuthResponse>(url, data, this.httpOptions).pipe(
      tap(response => {
        this.authorise(response);
      }),
      catchError(serverErrorHandle<AuthResponse>())
    );
  }

  logout() {
    const url = this.baseAuthUrl + '/logout';
    const headers = this.authHeader();
    this.localLogout();

    return this.http.post(url, null, headers);
  }

  private localLogout() {
    window.localStorage.removeItem('authToken');
    this.user = this.token = null;
  }

  getUser() {
    const url = this.baseAuthUrl + '/me';

    return this.http.get<User>(url, this.authHeader()).pipe(
      tap(response => {
        this.user = response;
      }),
      catchError((error: any): Observable<User> => {
          if (error.status === 401) {
            this.localLogout();
          }
          console.error(error);

          return of({} as User);
      })
    ).subscribe();
  }

  private authorise(response) {
    this.token = response.access_token;
    this.user = response.user;
    window.localStorage.setItem('authToken', JSON.stringify(this.token));
  }

}
