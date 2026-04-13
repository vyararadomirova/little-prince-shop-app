import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService, Product } from '../services/product.service';

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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(id);
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
}