import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// rxjs
import { toPromise } from 'rxjs/operator/toPromise';

import { Config } from './../../core/models';
import { LocalStorageService } from '.';

@Injectable()
export class AppSettingsService {

  constructor(
    public localStorageService: LocalStorageService,
    private http: HttpClient
  ) { }

  private readonly configKey = 'config';

  getConfig(): Promise<Config> {
    const existingConfig = JSON.parse(this.localStorageService.getItem(this.configKey));

    if (!existingConfig) {
      return Promise.resolve(new Config('http://localhost:3000/'));
      // this.http.get('assets/app-settings.json')
      //   .toPromise()
      //   .then((configFromFile) => {
      //     const config = configFromFile || new Config('http://localhost:3000/');
      //     console.log('Got config from file or default');
      //     this.saveConfig(config);
      //     return config;
      //   })
      //   .catch(err => {
      //     console.log(err.message);
      //     throw err;
      //   });
    } else {
      console.log('Got existing config');
      return Promise.resolve(existingConfig);
    }
  }

  saveConfig(config: Config): void {
    this.localStorageService.setItem(this.configKey, config);
  }

}
