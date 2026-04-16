import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  product: any = {
    _id: '',
    name: '',
    description: '',
    price: null,
    imageUrl: '',
    _ownerId: ''
  };
  isLoading = true;
  error = '';
  loading = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Edit ID от URL:', id);
    if (id) {
      this.loadProduct(id);
    } else {
      this.error = 'Невалиден ID на продукт';
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  loadProduct(id: string) {
    console.log('Зареждане на продукт с ID:', id);
    this.http.get(`http://localhost:3030/data/products/${id}`).subscribe({
      next: (data: any) => {
        console.log('Успешно зареден продукт:', data);
        this.product = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Грешка при зареждане:', err);
        this.error = 'Грешка при зареждане на продукта';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSubmit(): void {
    this.error = '';
    this.loading = true;

    const token = this.authService.currentUser?.accessToken;
    const id = this.product._id;
    const currentUserId = this.authService.currentUser?._id;

    console.log('Токен:', token);
    console.log('ID на продукта:', id);
    console.log('ID на текущия потребител:', currentUserId);

    if (!token) {
      this.error = 'Нямате права. Моля, влезте като администратор.';
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

  const updateData = {
    name: this.product.name,
    description: this.product.description,
    content: this.product.content,   
    price: this.product.price,
    imageUrl: this.product.imageUrl,
    _ownerId: currentUserId
};

    console.log('Изпращане на PUT заявка:', id, updateData);

    this.http.put(`http://localhost:3030/data/products/${id}`, updateData, {
      headers: { 
        'X-Authorization': token,
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: () => {
        console.log('Успешно редактиране');
        this.loading = false;
        this.router.navigate(['/details', id]);
      },
      error: (err) => {
        console.error('Грешка при edit:', err);
        this.loading = false;
        this.error = 'Грешка при редактиране на продукт';
        this.cdr.detectChanges();
      }
    });
  }
}