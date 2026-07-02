import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameCardComponent } from './game-card.component';
import { provideRouter } from '@angular/router';

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCardComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;
    component.game = { id: 1, title: 'Portal 3', price: 19.99, available: true };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit remove event with the game id', () => {
    spyOn(component.remove, 'emit');
    component.onRemoveClick();
    expect(component.remove.emit).toHaveBeenCalledWith(1);
  });

  it('should emit addToCart event with the game', () => {
    spyOn(component.addToCart, 'emit');
    component.onAddToCartClick();
    expect(component.addToCart.emit).toHaveBeenCalledWith(component.game);
  });
});
