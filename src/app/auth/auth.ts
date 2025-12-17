import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LOGIN_URL =
    'https://hiring-dev.internal.kloudspot.com/api/auth/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(this.LOGIN_URL, { email, password }).pipe(
      tap(response => {
        // assuming response contains token
        localStorage.setItem('auth_token', response.token);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  logout() {
    localStorage.removeItem('auth_token');
  }
}
