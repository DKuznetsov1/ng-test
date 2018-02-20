import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

import { User } from '../models';
import { LocalStorageService } from './';

@Injectable()
export class UserService {
  private readonly usersKey = 'users';
  currentUser: User;

  constructor(
    public localStorageService: LocalStorageService
  ) { }

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
    this.localStorageService.setItem(this.usersKey, JSON.stringify(users));
  }

  getAll(): Array<User> {
    return this.usersObjectExist() ? JSON.parse(this.localStorageService.getItem(this.usersKey)) : [];
  }

  private createUser(prefix: string): User {
    const user = new User(prefix + '_' + uuid(), 'test_login', 'email@example.com');
    const hasUsers = this.usersObjectExist();

    if (!hasUsers) {
      this.localStorageService.setItem(this.usersKey, '{}');
    }

    const users = this.getAll();

    users[user.id] = user;
    this.localStorageService.setItem(this.usersKey, JSON.stringify(users));

    return user;
  }

  private usersObjectExist(): boolean {
    return typeof this.localStorageService.getItem(this.usersKey) !== 'undefined';
  }

}
