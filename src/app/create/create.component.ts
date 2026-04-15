import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  product = {
    name: '',
    description: '',
    price: null,
    imageUrl: ''
  };
  error = '';
  loading = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.error = '';

    if (!this.product.name || !this.product.description || !this.product.price) {
      this.error = 'Моля, попълнете всички задължителни полета';
      return;
    }

    this.loading = true;

    const token = this.authService.currentUser?.accessToken;
    
    if (!token) {
      this.error = 'Нямате права да добавяте продукти. Моля, влезте в профила си.';
      this.loading = false;
      return;
    }

    this.http.post('http://localhost:3030/data/products', this.product, {
      headers: { 'X-Authorization': token }
    }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/catalog']);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Грешка при създаване на продукт';
        console.error(err);
      }
    });
  }
}
