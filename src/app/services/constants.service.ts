import { Injectable } from '@angular/core';

import { UserOptions } from '../models';

@Injectable()
export class ConstantsService {

  private userOptions: UserOptions;

  constructor() { }

  getConstValue(): any {
    return {
      App: 'TaskManager',
      Ver: '1.0'
    };
  }

}
