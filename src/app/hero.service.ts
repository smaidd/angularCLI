import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroUrl, hero, this.httpOption).pipe(
      tap((newHero: Hero) => this.log(`added new hero w/ id = ${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  private heroUrl = 'api/listOfHeroes';
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/jspm'
    })
  };
  constructor(
    private message: MessageService,
    private http: HttpClient) { }
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroUrl, hero, this.httpOption)
      .pipe(tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero')));
  }
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>())
    );
  }
  getHeroById(id: number): Observable<Hero> {
    // this.message.addMessage(`HeroService: fetched hero id=${id}`);
    // return of(HEROES.find(hero => hero.id === id));
    const url = `${this.heroUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id = ${id}`))
    );
  }
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOption).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  private log(messageLog: string) {
    this.message.addMessage(`HeroService: ${messageLog}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      
      console.error(error); // log to console instead

      
      this.log(`${operation} failed: ${error.message}`);

     
      return of(result as T);
    };
  }
}
