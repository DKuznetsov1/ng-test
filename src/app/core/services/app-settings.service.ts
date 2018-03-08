import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { toPromise } from 'rxjs/operator/toPromise';

import { Config } from './../../core/models';
import { LocalStorageService } from './local-storage.service';

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
      return this.http.get('assets/app-settings.json')
        .toPromise()
        .then((configFromFile) => {
          const config = configFromFile || new Config('localhost');
          console.log('Got config from file or default');
          this.saveConfig(config);
          return config;
        });
    } else {
      console.log('Got existing config');
      return Promise.resolve(existingConfig);
    }
  }

  saveConfig(config: Config): void {
    this.localStorageService.setItem(this.configKey, config);
  }

}
