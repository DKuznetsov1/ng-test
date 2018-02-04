import { Injectable } from '@angular/core';

import { UserOptions } from '../models';

@Injectable()
export class ConfigOptionsService {

  private userOptions: UserOptions;

  constructor() { }

  setUserOptions(userOpts: UserOptions): void {
    this.userOptions = userOpts;
  }

  getUserOptions() {
    return this.userOptions;
  }
}
