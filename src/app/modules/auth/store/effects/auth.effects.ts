import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, switchMap, map, catchError } from 'rxjs/operators';
import { AuthService } from '@services';
import { Observable, of } from 'rxjs';
import { AuthActionTypes, LogIn, LogInSuccess, LogInFailure, SignUp, SignUpSuccess, SignUpFailure } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  @Effect()
  LogIn$: Observable < any > = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap(payload => {
      return this.authService.logIn(payload).pipe(
        map((response: any) => {
          return new LogInSuccess({
            id: response.user.id,
            username: response.user.username,
            first_name: response.user.first_name,
            last_name: response.user.last_name,
            email: response.user.email,
            token: this.firstUpper(response.token_type) + ' ' + response.access_token
          });
        }),
        catchError((error: any) => {
          return of(new LogInFailure({ error }));
        })
      );
    }));

  @Effect({ dispatch: false })
  LogInSuccess$: Observable < any > = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap(() => this.router.navigateByUrl('/stickers'))
  );

  @Effect({ dispatch: false })
  LogInFailure$: Observable < any > = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect()
  SignUp$: Observable < any > = this.actions$.pipe(
    ofType(AuthActionTypes.SIGNUP),
    map((action: SignUp) => action.payload),
    switchMap(payload => {
      return this.authService.signUp(payload).pipe(
        map((response: any) => {
          return new SignUpSuccess({
            id: response.user.id,
            username: response.user.username,
            first_name: response.user.first_name,
            last_name: response.user.last_name,
            email: response.user.email,
            token: this.firstUpper(response.token_type) + ' ' + response.access_token
          });
        }),
        catchError((error: any) => {
          return of(new SignUpFailure({ error }));
        })
      );
    }));

  @Effect({ dispatch: false })
  SignUpSuccess$: Observable < any > = this.actions$.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap(() => this.router.navigateByUrl('/auth/log-in'))
  );

  @Effect({ dispatch: false })
  SignUpFailure$: Observable < any > = this.actions$.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE)
  );

  @Effect({ dispatch: false })
  LogOut$: Observable < any > = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(() => this.router.navigateByUrl('/auth/log-in'))
  );

  protected firstUpper = (world: string): string => {
    if (world.length > 1) {
      return world.charAt(0).toUpperCase() + world.slice(1);
    } else {
      return '';
    }
  }

}
