import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Game } from './game.service';

describe('CartService', () => {
  let service: CartService;
  const mockGame: Game = { id: 1, title: 'Portal 3', price: 19.99, available: true };

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an item and update totals', () => {
    service.addToCart(mockGame);
    expect(service.totalItems()).toBe(1);
    expect(service.totalPrice()).toBe(19.99);
  });

  it('should remove an item', () => {
    service.addToCart(mockGame);
    service.removeFromCart(mockGame.id);
    expect(service.totalItems()).toBe(0);
  });

  it('should clear the cart', () => {
    service.addToCart(mockGame);
    service.clearCart();
    expect(service.totalItems()).toBe(0);
  });
});
