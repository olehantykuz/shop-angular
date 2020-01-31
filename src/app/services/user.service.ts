import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { LoginData, User } from '../core/types/models/user';
import { AuthResponse } from '../core/types/requests/auth-response';
import { environment } from '../../environments/environment';

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

  login(data: LoginData) {
    const url = this.baseAuthUrl + '/login';

    return this.http.post<AuthResponse>(url, data, this.httpOptions).pipe(
      tap(response => {
        this.authorise(response);
        this.user = response.user;
      }),
      catchError(this.handleError<AuthResponse>())
    );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error('error', error);

      return of(result as T);
    };
  }

  private authorise(response) {
    window.localStorage.setItem('authToken', JSON.stringify(response.access_token));
  }

}
