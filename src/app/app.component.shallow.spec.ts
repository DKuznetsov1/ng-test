import { TestBed, ComponentFixture, ComponentFixtureAutoDetect, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component, Directive, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';

import { UserService, AppSettingsService } from './core/services';
import { User } from './core/models';

let component: AppComponent,
    fixture: ComponentFixture<AppComponent>,
    debugElement: DebugElement;

const userServiceStub = {
  createAnonymousUser: () => null,
  setUser: () => null
};

const appSettingsServiceStub = {
  getConfig: () => null
};

describe('AppComponent (Shallow)', () => {
  beforeEach(async(() => {
    appSettingsServiceStub.getConfig = jasmine.createSpy();
    userServiceStub.createAnonymousUser = jasmine.createSpy().and.returnValue(
      new User('userId', 'testLogin', 'test@email.com')
    );
    userServiceStub.setUser = jasmine.createSpy();

    TestBed
      .configureTestingModule({
        declarations: [
          AppComponent,
        ],
        providers: [
          { provide: UserService, useValue: userServiceStub},
          { provide: AppSettingsService, useValue: appSettingsServiceStub}
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    debugElement = fixture.debugElement;
  });

  it('should get config and create anonymous user on init', () => {

    const appSettingsService = debugElement.injector.get(AppSettingsService);
    const userService = debugElement.injector.get(UserService);

    expect((<jasmine.Spy>appSettingsService.getConfig).calls.any()).toBeTruthy();
    expect((<jasmine.Spy>userService.createAnonymousUser).calls.any()).toBeTruthy();
    expect((<jasmine.Spy>userService.setUser).calls.any()).toBeTruthy();
    expect((<jasmine.Spy>userService.setUser).calls.argsFor(0)[0])
      .toEqual(new User('userId', 'testLogin', 'test@email.com'));
  });

  it('should contain application name', () => {
    fixture.detectChanges();

    expect(debugElement.nativeElement.innerHTML).toContain('DK Store');
  });
});
