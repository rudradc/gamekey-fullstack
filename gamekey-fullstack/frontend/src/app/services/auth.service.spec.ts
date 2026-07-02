import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve a token', () => {
    service.setToken('abc123');
    expect(service.getToken()).toBe('abc123');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should clear a token on logout', () => {
    service.setToken('abc123');
    service.logout();
    expect(service.getToken()).toBeNull();
    expect(service.isAuthenticated()).toBeFalse();
  });
});
