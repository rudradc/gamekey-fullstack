import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Game } from '../../services/game.service';
import { KeyFormatPipe } from '../../pipes/key-format.pipe';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, RouterModule, KeyFormatPipe],
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent {
  // @Input allows the parent to pass down a single Game object
  @Input() game!: Game;

  // Mock key code to demonstrate the custom pipe
  mockKey: string = 'a3f9b21c4de79901cc84';

  // @Output events bubble user actions back up to the parent
  @Output() remove = new EventEmitter<number>();
  @Output() addToCart = new EventEmitter<Game>();
  @Output() toggleAvailability = new EventEmitter<Game>();

  onRemoveClick(): void {
    this.remove.emit(this.game.id);
  }

  onAddToCartClick(): void {
    this.addToCart.emit(this.game);
  }

  onToggleClick(): void {
    this.toggleAvailability.emit(this.game);
  }
}
