import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, NavigationEnd, Router } from '@angular/router';
import { ProductService, Product } from '../services/product.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  private routerSubscription: Subscription | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    console.log('ngOnInit се извика');
    this.loadProducts();
    
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd && event.url === '/catalog'))
      .subscribe(() => {
        console.log('Навигация към каталог - презареждам!');
        this.loadProducts();
      });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  loadProducts() {
    console.log('loadProducts се извика');
    console.log('Текущ брой продукти преди зареждане:', this.products.length);
    
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log('Данни от сървъра:', data);
        this.products = Array.isArray(data) ? data : Object.values(data);
        this.isLoading = false;
        this.cdr.detectChanges();
        console.log('Заредени продукти:', this.products);
        console.log('Първият продукт има _id:', this.products[0]?._id);
      },
      error: (err) => {
        console.error('Грешка при зареждане на продукти:', err);
        this.errorMessage = 'Възникна грешка при зареждането на продуктите. Моля, опитайте по-късно.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}