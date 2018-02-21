import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  isLoggedIn = false;
  isAdmin: boolean;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(isAdmin): Observable<boolean> {
    return of(true).pipe(
      delay(100),
      tap(val => this.isAdmin = isAdmin),
      tap(val => this.isLoggedIn = true),
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.isAdmin = false;
  }
}
