import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { UserService } from '../../services';
import { User } from '../../models';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  users: Array<User>;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('AdminDashboardComponent init');
    const usersObject = this.userService.getAll();
    this.users = [];

    Object.keys(usersObject).forEach((x) => {
      this.users.push(usersObject[x]);
    });
  }

  removeUsersExceptCurrent() {
    this.userService.removeAllExceptCurrent();
  }

}
