import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService, Product } from '../services/product.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']  
})
export class DetailsComponent implements OnInit {  
  product: Product | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.isAdmin = user?.email === 'admin@abv.bg';
      this.cdr.detectChanges();
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(id);
    } else {
      this.isLoading = false;
      this.errorMessage = 'Невалиден идентификатор на продукт';
      this.cdr.detectChanges();
    }
  }

  loadProduct(id: string) {
    this.isLoading = true;
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.isLoading = false;
        this.cdr.detectChanges();
        console.log('Зареден продукт:', this.product);
      },
      error: (err) => {
        console.error('Грешка при зареждане на продукт:', err);
        this.errorMessage = 'Продуктът не беше намерен';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  addToCart(): void {
    console.log('Добавяне в кошницата:', this.product);
  }

  editProduct(): void {
    console.log('Редактиране на продукт:', this.product);
  }

  deleteProduct(): void {
    if (!confirm('Сигурни ли сте, че искате да изтриете този продукт?')) {
      return;
    }

    const token = this.authService.currentUser?.accessToken;
    const id = this.product?._id;

    if (!token || !id) {
      console.error('Липсва токен или ID');
      return;
    }

    this.productService.deleteProduct(id, token).subscribe({
      next: () => {
        console.log('Продуктът е изтрит');
        this.router.navigate(['/catalog']);
      },
      error: (err) => {
        console.error('Грешка при изтриване:', err);
        this.errorMessage = 'Неуспешно изтриване на продукт';
        this.cdr.detectChanges();
      }
    });
  }
}