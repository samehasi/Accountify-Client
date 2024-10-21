// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../State/app.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor( private router: Router , private store:Store) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectIsLoggedIn).pipe(
      //tap(x => console.log(`is logged in in auth guard? ${x}`)),
      take(1),
      map((isLoggedIn) => {
        if (isLoggedIn) {
          // If the user is logged in, redirect them to the dashboard (or any other page)
          this.router.navigate(['/']);
          return false;
        } else {
          // If the user is not logged in, allow access to the route
          return true;
        }
      })
    );
  }
}
