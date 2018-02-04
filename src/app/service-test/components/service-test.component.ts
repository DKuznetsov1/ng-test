import { Component, OnInit, Optional, Inject } from '@angular/core';

import {
  ConfigOptionsService,
  ConstantsService,
  StorageService,
  GeneratorService,
  GeneratorServiceToken
} from '../../services';

import { UserOptions } from '../../models';

@Component({
  selector: 'app-service-test',
  templateUrl: './service-test.component.html',
  styleUrls: ['./service-test.component.css']
})
export class ServiceTestComponent implements OnInit {

  configOptionsServiceData: string;
  storageServiceData: string;
  constantsServiceData: string;
  generatorServiceData: string;

  constructor(@Optional() private configOptionsService: ConfigOptionsService,
  @Optional() private storageService: StorageService,
  @Optional() private constantsService: ConstantsService,
  @Inject(GeneratorServiceToken) @Optional() private generatorService: GeneratorService) { }

  ngOnInit() {
    if (this.configOptionsService !== null) {
      this.configOptionsService.setUserOptions(new UserOptions(1, 'ussername', '111@111.111'));
      this.configOptionsServiceData = this.configOptionsService.getUserOptions().email;
    } else {
      this.configOptionsServiceData = 'configOptionsService not registered';
    }

    if (this.storageService !== null) {
      this.storageService.setItem('key1', 'test-value1');
      this.storageServiceData = this.storageService.getItem('key1');
    } else {
      this.storageServiceData = 'storageService not registered';
    }

    if (this.constantsService !== null) {
      this.constantsServiceData = JSON.stringify(this.constantsService.getConstValue());
    } else {
      this.constantsServiceData = 'constantsService not registered';
    }

    if (this.generatorService !== null) {
      this.generatorServiceData = this.generatorService.getRandomSequence();
    } else {
      this.generatorServiceData = 'generatorService not registered';
    }
  }

}
