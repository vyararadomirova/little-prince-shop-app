import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: CartItem[] = [];
  total = 0;

  constructor(public cartService: CartService) {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  removeItem(id: string): void {
    this.cartService.removeItem(id);
  }

  updateQuantity(id: string, quantity: number): void {
    if (quantity >= 1) {
      this.cartService.updateQuantity(id, quantity);
    }
  }

  checkout(): void {
    alert('Благодарим за поръчката!');
    this.cartService.clearCart();
  }
}