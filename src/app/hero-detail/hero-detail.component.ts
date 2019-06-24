import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.getHero();
  }
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHeroById(id).subscribe(hero => this.hero = hero);
  }
  save(): void {
    this.heroService.updateHero(this.hero).subscribe(()=>this.redirect());
  }
  redirect() {
    this.router.navigate(['/dashboard']);
  }
  goBack() {
    this.location.back();
  }
}
