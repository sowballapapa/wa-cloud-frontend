import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButton } from '@spartan-ng/helm/button';
import { AdvantagesComponent } from '../../shared/advantages/advantages';
import { OffersComponent } from '../../shared/offers/offers';
import { NewsletterComponent } from '../../shared/newsletter/newsletter';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HlmButton, AdvantagesComponent, OffersComponent, NewsletterComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {

}
