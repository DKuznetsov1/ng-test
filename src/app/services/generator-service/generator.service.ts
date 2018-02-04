import { Injectable } from '@angular/core';

@Injectable()
export class GeneratorService {

  constructor(private length: number) { }

  getRandomSequence(): string {
    let result = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < this.length; i++) {
      result += possible.charAt(
                  Math.floor(
                    Math.random() * possible.length));
    }

    return result;
  }

}
