import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  username = '';
  password = '';
  confirmPassword = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.error = '';

    if (!this.email || !this.username || !this.password) {
      this.error = 'Моля, попълнете всички полета';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Паролите не съвпадат';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'Паролата трябва да бъде поне 6 символа';
      return;
    }

    this.loading = true;

    this.authService.register({ 
      email: this.email, 
      username: this.username, 
      password: this.password 
    }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Грешка при регистрация. Имейлът може да е зает.';
        console.error('Register error:', err);
      }
    });
  }
}