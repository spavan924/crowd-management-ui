import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LOGIN_URL =
    'https://hiring-dev.internal.kloudspot.com/api/auth/login';

  private loggedIn = false;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Restore login state on browser refresh
    if (isPlatformBrowser(this.platformId)) {
      this.loggedIn = !!localStorage.getItem('auth_token');
    }
  }

  login(email: string, password: string) {
    return this.http.post<any>(this.LOGIN_URL, { email, password }).pipe(
      tap(response => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('auth_token', response.token);
        }
        this.loggedIn = true;
      })
    );
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout() {
    this.loggedIn = false;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('auth_token');
    }
  }
}
