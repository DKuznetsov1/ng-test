import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    throw new Error('Not implemented');
  }

  getItem(key: string): any {
    throw new Error('Not implemented');
  }

  removeItem(key: string): void {
    throw new Error('Not implemented');
  }

}
