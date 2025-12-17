import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})

export class Login {
  email = '';
  password = '';
  error = '';

  showPassword = false;

  // 👇 Multiple users stored locally
  private users = [
    { email: 'spavan924@gmail.com', password: '1234567890' },
    { email: 'test@test.com', password: '1234567890' }
  ];

  constructor(private auth: AuthService, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.error = '';

    const validUser = this.users.find(
      u => u.email === this.email && u.password === this.password
    );

    if (validUser) {
      // Store login flag (used by auth guard)
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', validUser.email);

      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Invalid email or password';
    }
  }
}
