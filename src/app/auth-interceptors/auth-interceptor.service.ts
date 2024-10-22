// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { signOut } from '../State/app.actions';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    console.log(`interceptor is intercepting`)
  // Inject services directly in this function
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const store = inject(Store);

  console.log(token?.toString())
    // if(token === null)
    // {
    //     router.navigate(['/login']);
    // }

  // Clone the request to add the authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });

  // Handle the request and catch any errors
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        store.dispatch(signOut());
        console.error('Unauthorized request - redirecting to login');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
