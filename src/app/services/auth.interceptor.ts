import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {UserService} from './user.service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.userService.isLoggedIn()) {
      const { token } = this.userService;
      const headers = token ? { Authorization: 'Bearer ' + token } : {};

      req = req.clone({
        setHeaders: headers
      });
    }

    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log('[Interceptor Error]', error);
          if (error.status === 401) {
            this.userService.logout();
          }

          return throwError(error);
        })
      );
  }

}
