import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GameService, Game } from '../../services/game.service';
import { CartService } from '../../services/cart.service';
import { GameCardComponent } from '../game-card/game-card.component';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, GameCardComponent],
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  newGameTitle: string = '';
  newGamePrice: number = 0;

  games: Game[] = [];

  constructor(
    private gameService: GameService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.fetchGames();
  }

  fetchGames(): void {
    this.gameService.getGames().subscribe({
      next: (data: Game[]) => {
        this.games = data;
      },
      error: (err) => {
        console.error('Error fetching games: ', err);
      }
    });
  }

  addGame(): void {
    if (this.newGameTitle.trim() === '') return;

    this.gameService.addGame(this.newGameTitle, this.newGamePrice).subscribe({
      next: () => {
        this.fetchGames();
        this.newGameTitle = '';
        this.newGamePrice = 0;
      }
    });
  }

  toggleAvailability(game: Game): void {
    game.available = !game.available;
  }

  addToCart(game: Game): void {
    this.cartService.addToCart(game);
  }

  onRemoveGame(gameId: number): void {
    this.games = this.games.filter(g => g.id !== gameId);
    console.log(`[Parent Component] Removed game ID: ${gameId}`);
  }
}
