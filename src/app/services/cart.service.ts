
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();

  constructor() {
    // Зареждане от localStorage при стартиране
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        this.cartItems = JSON.parse(savedCart);
        this.cartSubject.next(this.cartItems);
      } catch(e) {
        console.error('Грешка при зареждане на количката:', e);
      }
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  getItems(): CartItem[] {
    return this.cartItems;
  }

  addItem(product: any): void {
    const existingItem = this.cartItems.find(item => item._id === product._id);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({
        _id: product._id,
        name: product.name,
        price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
        imageUrl: product.imageUrl,
        quantity: 1
      });
    }
    
    this.cartSubject.next(this.cartItems);
    this.saveToLocalStorage();
  }

  removeItem(id: string): void {
    this.cartItems = this.cartItems.filter(item => item._id !== id);
    this.cartSubject.next(this.cartItems);
    this.saveToLocalStorage();
  }

  updateQuantity(id: string, quantity: number): void {
    const item = this.cartItems.find(i => i._id === id);
    if (item && quantity >= 1) {
      item.quantity = quantity;
      this.cartSubject.next(this.cartItems);
      this.saveToLocalStorage();
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
    localStorage.removeItem('cart');
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getCount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }
}