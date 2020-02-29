import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { Store } from '@ngrx/store';
import { User } from '@interfaces';
import { AppState } from '@main/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public user: User;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private store: Store < AppState >
  ) {
    this.store.select((state: any) => state.auth)
      .subscribe((response: any) => this.user = new User(response.user));
  }

  getToken(): string {
    return this.user.token;
  }

  isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.getToken());
  }

  logIn(data: any): Observable < any > {
    return this.http.post < any > (`${environment.serverUrl}/auth/login`, data);
  }

  signUp(data: any): Observable < any > {
    return this.http.post < any > (`${environment.serverUrl}/auth/register`, data);
  }

}
