import { Injectable, signal, computed, effect } from '@angular/core';
import { Game } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // 1. Writeable signal containing the cart's Game array
  private cartItems = signal<Game[]>([]);

  // 2. Expose the signal as a read-only computed value
  cart = computed(() => this.cartItems());

  // 3. Total number of items in the cart
  totalItems = computed(() => this.cartItems().length);

  // 4. Total cost of items in the cart
  totalPrice = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + Number(item.price), 0);
  });

  constructor() {
    // 5. Persist cart contents to localStorage whenever they change
    effect(() => {
      const items = this.cartItems();
      localStorage.setItem('cart_items', JSON.stringify(items));
      console.log(`[Cart State] Updated: ${items.length} items logged.`);
    });

    // Load initial state from localStorage if available
    const saved = localStorage.getItem('cart_items');
    if (saved) {
      this.cartItems.set(JSON.parse(saved));
    }
  }

  addToCart(game: Game): void {
    this.cartItems.update(items => [...items, game]);
  }

  removeFromCart(gameId: number): void {
    this.cartItems.update(items => items.filter(item => item.id !== gameId));
  }

  clearCart(): void {
    this.cartItems.set([]);
  }
}
