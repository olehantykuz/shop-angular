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
  baseAuthUrl = environment.baseUrl + '/auth';
  user: User | null;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  get token(): string {
    const expiration = localStorage.getItem('authTokenExpires');
    const expDate = !!expiration ? new Date(expiration) : new Date(+expiration);

    if (!expiration && new Date() > expDate) {
      this.logout();

      return null;
    }

    return localStorage.getItem('authToken');
  }

  isLoggedIn() {
    return !!this.token;
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
    window.localStorage.removeItem('authToken');
    window.localStorage.removeItem('authTokenExpires');
    this.user = null;
  }

  getUser() {
    const url = this.baseAuthUrl + '/me';

    return this.http.get<User>(url, this.authHeader()).pipe(
      tap(response => {
        this.user = response;
      }),
      catchError((error: any): Observable<User> => {
          if (error.status === 401) {
            this.logout();
          }
          console.error(error);

          return of({} as User);
      })
    );
  }

  private authHeader() {
    const header = this.token ? { Authorization: 'Bearer ' + JSON.parse(window.localStorage.getItem('authToken')) } : {};

    return {
      headers: new HttpHeaders(header)
    };
  }

  private authorise(data) {
    const expDate = +data.expires_in ? new Date(new Date().getTime() + +data.expires_in * 1000) : 0;
    window.localStorage.setItem('authToken', JSON.stringify(data.access_token));
    window.localStorage.setItem('authTokenExpires', expDate.toString());
    this.user = data.user;
  }

}
