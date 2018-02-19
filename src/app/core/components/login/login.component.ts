import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.setMessage();
  }

  private setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in as ' + (this.authService.isAdmin ? 'Admin' : 'User') : 'out');
  }

  login(isAdmin: boolean) {
    this.message = 'Trying to log in ...';
    this.authService.login(isAdmin).subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';

        const navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };

        // Redirect the user
        this.router.navigate([redirect], navigationExtras);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }

}
