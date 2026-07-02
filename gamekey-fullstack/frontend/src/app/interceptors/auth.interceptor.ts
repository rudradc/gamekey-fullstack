import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

// Functional interceptor: attaches the auth token header to outbound requests
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    // HTTP requests are immutable, so we clone and add the header
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Token ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};
