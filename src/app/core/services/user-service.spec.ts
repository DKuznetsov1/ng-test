import { UserService } from './user.service';
import { LocalStorageService } from './local-storage.service';

let storageObjFake = {};

const localStorageServiceStub: LocalStorageService = {
  setItem: () => null,
  getItem: () => null,
  removeItem: () => null
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    storageObjFake = {};
    service = new UserService(localStorageServiceStub);

    localStorageServiceStub.setItem = jasmine.createSpy().and.callFake((key, value) => {
      storageObjFake[key] = JSON.stringify(value);
    });
    localStorageServiceStub.getItem = jasmine.createSpy().and.callFake((key) => {
      return storageObjFake[key];
    });
  });

  const checkUserCreatekExpectations = () => {
    expect((<jasmine.Spy>localStorageServiceStub.getItem).calls.count()).toBe(2);
    expect(storageObjFake['users']).toBeTruthy();
    expect(Object.keys(JSON.parse(storageObjFake['users'])).length).toBe(1);
  };

  it('should create anonymous user and save to storage', () => {
    const result = service.createAnonymousUser();

    expect(result.id).toContain('Anonymous');

    checkUserCreatekExpectations();
  });

  it('should create admin user and save to storage', () => {
    const result = service.createAdminUser();

    expect(result.id).toContain('Admin');

    checkUserCreatekExpectations();
  });

  it('should create regular user and save to storage', () => {
    const result = service.createRegularUser();

    expect(result.id).toContain('Regular');

    checkUserCreatekExpectations();
  });

  it('should remove all users except current', () => {
    const result = service.createRegularUser();

    service.setUser(result);

    service.createRegularUser();
    service.createRegularUser();

    expect(Object.keys(JSON.parse(storageObjFake['users'])).length).toBe(3);

    service.removeAllExceptCurrent();

    expect(Object.keys(JSON.parse(storageObjFake['users'])).length).toBe(1);

  });

});
