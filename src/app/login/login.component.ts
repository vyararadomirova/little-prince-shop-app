import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.error = '';

    if (!this.email || !this.password) {
      this.error = 'Моля, попълнете имейл и парола';
      return;
    }

    this.loading = true;

    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.loading = false;
          this.error = 'Грешен имейл или парола';
          console.error('Login error:', err);
        }
      });
  }
}