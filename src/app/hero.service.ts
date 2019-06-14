import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private message: MessageService) { }
  getHeroes(): Observable<Hero[]> {
    this.message.addMessage('HeroSerivce: fetched heroes');
    return of(HEROES);
  }
}
