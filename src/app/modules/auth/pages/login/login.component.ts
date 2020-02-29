import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, ActionsSubject } from '@ngrx/store';
import { AppState } from '@main/app.reducer';
import { Subscription } from 'rxjs';
import { LogIn, AuthActionTypes } from '../../store/actions/auth.actions';
import { filter } from 'rxjs/internal/operators/filter';
import { AuthService } from '@services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public hidePassword: boolean;
  public isSending: boolean;
  public subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store < AppState > ,
    private actionsSubject$: ActionsSubject,
    private authService: AuthService
  ) {
    this._createForm();
    this.isSending = false;
    this.hidePassword = true;
  }

  ngOnInit() {

    this.subscription = this.actionsSubject$.pipe(
      filter((action) => action.type === AuthActionTypes.LOGIN_SUCCESS || action.type === AuthActionTypes.LOGIN_FAILURE)
    ).subscribe(() => this.isSending = !this.isSending);

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private _createForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onSubmit(payload: any): void {
    if (this.loginForm.valid) {
      this.isSending = true;
      this.store.dispatch(new LogIn(payload));
    } else {
      this.isSending = false;
    }
  }

}
