import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import { AuthserviceService } from '../auth/authservice.service';

@Injectable({
  providedIn: 'root',
})
export class AdminauthguardGuard implements CanActivate {
  constructor(private _authService: AuthserviceService) {}

  canActivate(): Observable<boolean> {
    return this._authService
      .isUserAdmin()
      .take(1)
      .map((res) => {
        if (res) {
          return true;
        } else {
          return false;
        }
      })
      .do((isadmin) => {
        console.log(isadmin);
        return false;
      });
  }
}
