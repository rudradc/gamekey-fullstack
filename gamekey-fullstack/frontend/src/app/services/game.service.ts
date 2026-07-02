import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Game {
  id: number;
  title: string;
  price: number;
  available?: boolean; // Optional since backend might not always send it
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  // URL pointing to the running Django REST API endpoint
  private apiUrl = 'https://gamekey-fullstack.onrender.com/api/games/';

  constructor(private http: HttpClient) {}

  // Fetch games list from the server
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Add a new game record to the database
  addGame(title: string, price: number): Observable<Game> {
    const payload = {
      title: title,
      price: price,
      publisher: 1 // Default publisher ID required by the Django model
    };

    return this.http.post<Game>(this.apiUrl, payload).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code ${error.status}, body was: ${error.error}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
