import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService, Product } from '../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  topProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef  
  ) {}

  ngOnInit() {
    this.loadTopProducts();
  }

  loadTopProducts() {
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        const products: Product[] = Array.isArray(data) ? data : Object.values(data);
        this.topProducts = products.filter(p => p.isTop).slice(0, 3);
        this.cdr.detectChanges();
        console.log('Топ продукти:', this.topProducts);
      },
      error: (err) => {
        console.error('Грешка:', err);
      }
    });
  }
}