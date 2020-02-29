import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad } from '@angular/router';
import { AuthService } from '@services';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/auth/log-in');
      return false;
    }
    return true;
  }

  canLoad(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/auth/log-in');
      return false;
    }
    return true;
  }
}
