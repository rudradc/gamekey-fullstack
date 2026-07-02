import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';

describe('authInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting()
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    localStorage.clear();
  });

  afterEach(() => httpMock.verify());

  it('should attach Authorization header when a token exists', () => {
    authService.setToken('mockToken123');

    httpClient.get('/api/games/').subscribe();

    const req = httpMock.expectOne('/api/games/');
    expect(req.request.headers.get('Authorization')).toBe('Token mockToken123');
    req.flush([]);
  });

  it('should not attach Authorization header when no token exists', () => {
    httpClient.get('/api/games/').subscribe();

    const req = httpMock.expectOne('/api/games/');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush([]);
  });
});
