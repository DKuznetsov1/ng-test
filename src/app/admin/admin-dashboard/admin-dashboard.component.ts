import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../services';
import { User } from '../../models';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  users: Array<User>;

  sub: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log('AdminDashboardComponent init');
    const usersObject = this.userService.getAllSubscription();
    this.users = this.userService.getAll();

    this.sub = usersObject.subscribe(
      usersUpdated => {
        this.users = usersUpdated;
      },
      err => console.log(err)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  removeUsersExceptCurrent() {
    this.userService.removeAllExceptCurrent();
  }

}
