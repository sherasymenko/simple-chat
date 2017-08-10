import {CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {LoginService} from '../auth/login.service';

@Injectable()
export class ChatGuard implements CanActivate {
  constructor(private _router: Router, private _loginService: LoginService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this._loginService.isAuthenticated()) {
      alert('Brak dostępu. Musisz się zalogować.');
      this._router.navigate(['']);
      return false;
    }
    return true;
  }
}
