import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot,
  RouterStateSnapshot, Router, NavigationExtras, CanLoad, Route } from '@angular/router';

// rxjs
import { Observable } from 'rxjs/Observable';

// @Ngrx
import { Store } from '@ngrx/store';
import { AppState} from './../../+store';
import * as RouterActions from './../../+store/actions/router.actions';


import { AuthService } from './../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    console.log('CanActivateGuard is called');
    const { url } = state;
    return this.checkLogin(url);
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('CanActivateChild Guard is called');
    const { url } = state;
    return this.checkLogin(url);
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    console.log('CanLoad Guard is called');
    const url = `/${route.path}`;
        return this.checkLogin(url);
  }

  private checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn && this.authService.isAdmin) { return true; }

    this.store.dispatch(new RouterActions.Go({
      path: ['/login']
    }));

    return false;
  }

}
