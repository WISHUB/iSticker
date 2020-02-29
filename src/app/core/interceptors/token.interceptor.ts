import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '@services';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '@main/app.reducer';
import { LogOut } from '@auth/store/actions/auth.actions';
import Swal from 'sweetalert2';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private authService: AuthService;

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {

    this.authService = this.injector.get(AuthService);

    const token: string = this.authService.getToken();

    request = request.clone({
      setHeaders: {
        Authorization: token ? token : '',
        'Content-Type': 'application/json'
      }
    });

    return next.handle(request);
  }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private store: Store < AppState >) {}

  intercept(request: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {

  return next.handle(request).pipe(
    catchError((response: any) => {

      if (response instanceof HttpErrorResponse && (response.status === 401)) {
        this.store.dispatch(new LogOut());
      }

      if (response?.error?.code === 400 && response?.error?.message === 'Token is expired') {
        this.store.dispatch(new LogOut());
      }

      Swal.fire({
        title: response?.error?.message,
        html: `<b>${response.status} ${response.statusText}</b> | <a href="${response.url}" target="_blannk">Ver URL</a>`,
        showClass: {
          popup: 'animated fadeInDown faster'
        },
        hideClass: {
          popup: 'animated fadeOutUp faster'
        },
        showConfirmButton: false,
        position: 'bottom-end',
        backdrop: false,
        timer: 2500
      });

      return throwError(response);
    }));
  }
}
