import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import { AuthserviceService } from '../auth/authservice.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthguardGuard implements CanActivate {
  data!: any;
  roles: any;

  constructor(private _auth: AuthserviceService, private route: Router) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean | any> {
    const currentUser = this._auth.currentUser;
    if (currentUser) {
      if (
        next.data['roles'] &&
        next.data['roles'].indexOf(currentUser.role) === -1
      ) {
        this.route.navigate(['login']);
      } else {
        this.route.navigate(['myvault']);
      }
    }

    return of(true);
  }
}
