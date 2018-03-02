import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { User } from '../models';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class UserService {
  private readonly usersKey = 'users';

  currentUser: User;
  users: Subject<User[]>;
  users$: Observable<User[]>;

  constructor(
    public localStorageService: LocalStorageService
  ) {
    this.users = new Subject<User[]>();
    this.users$ = this.users.asObservable();
  }

  createAnonymousUser(): User {
    return this.createUser('Anonymous');
  }

  createRegularUser(): User {
    return this.createUser('Regular');
  }

  createAdminUser(): User {
    return this.createUser('Admin');
  }

  setUser(user: User): void {
    this.currentUser = user;
  }

  removeAllExceptCurrent(): void {
    const users = {};
    users[this.currentUser.id] = this.currentUser;
    this.localStorageService.setItem(this.usersKey, users);

    this.publishUsersChange(users);
  }

  getAllSubscription(): Observable<User[]> {
    return this.users$;
  }

  getAll(): Array<User> {
    const usersObject = this.usersObjectExist() ? JSON.parse(this.localStorageService.getItem(this.usersKey)) : {};

    const users = [];
    Object.keys(usersObject).forEach((x) => {
      users.push(usersObject[x]);
    });

    return users;
  }

  private createUser(prefix: string): User {
    const user = new User(prefix + '_' + uuid(), 'test_login', 'email@example.com');
    const hasUsers = this.usersObjectExist();

    if (!hasUsers) {
      this.localStorageService.setItem(this.usersKey, {});
    }

    const users = JSON.parse(this.localStorageService.getItem(this.usersKey));

    users[user.id] = user;
    this.localStorageService.setItem(this.usersKey, users);

    this.publishUsersChange(users);

    return user;
  }

  private usersObjectExist(): boolean {
    return this.localStorageService.getItem(this.usersKey);
  }

  private publishUsersChange(usersObject: Object): void {
    const users = [];
    Object.keys(usersObject).forEach((x) => {
      users.push(usersObject[x]);
    });
    this.users.next(users);
  }

}
