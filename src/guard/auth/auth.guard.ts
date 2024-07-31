import { Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): MaybeAsync<GuardResult> {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
