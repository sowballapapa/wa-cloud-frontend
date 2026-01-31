import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, NgIcon, HlmButton],
  providers: [provideIcons({ lucideCheck })],
  templateUrl: './offers.html',
  styleUrls: ['./offers.css']
})
export class OffersComponent {
  isHighQuality = signal(false);

  toggleMode(isHigh: boolean) {
    this.isHighQuality.set(isHigh);
  }

  highQualityOffers = [
    {
      title: 'Intro',
      specs: [
        'Serveurs privés virtuels (SPV)',
        '100% technologie SSD',
        'A partir de 5800 XOF',
        '4 cœurs de processeur virtuel',
        '8 Go de RAM',
        'Disque SSD 200 Go',
        'Port 200 Mbit/s',
        '1 Snapshot server'
      ],
      price: '4100 XOF',
      period: '/ans'
    },
    {
        title: 'Basic',
        specs: [
          'Serveurs privés virtuels (SPV)',
          '100% technologie SSD',
          'A partir de 10600 XOF',
          '6 cœurs de processeur virtuel',
          '16 Go de RAM',
          'Disque SSD 400 Go',
          'Port 400 Mbit/s',
          '2 Snapshot server'
        ],
        price: '4300 XOF',
        period: '/ans'
      },
    {
      title: 'Pro',
      specs: [
        'Serveurs privés virtuels (SPV)',
        '100% technologie SSD',
        'A partir de 17600 XOF',
        '8 cœurs de processeur virtuel',
        '30 Go de RAM',
        'Disque SSD 800 Go',
        'Port 600 Mbit/s',
        '3 Snapshot server'
      ],
      price: '4500 XOF',
      period: '/ans'
    },
    {
      title: 'Entreprise',
      specs: [
        'Serveurs privés virtuels (SPV)',
        '100% technologie SSD',
        'A partir de 31700 XOF',
        '10 cœurs de processeur virtuel',
        '60 Go de RAM',
        'Disque SSD 1.6 To',
        'Port 1 Gbit/s',
        '4 Snapshot server'
      ],
      price: '4700 XOF',
      period: '/ans'
    }
  ];

  lowCostOffers = [
    {
      title: 'Intro',
      specs: [
        'Serveurs privés virtuels (SPV)',
        'A partir de 4700 XOF',
        '2 cœurs de processeur virtuel',
        '4 Go de RAM',
        'Disque HDD 300 Go',
        'Port 100 Mbit/s'
      ],
      price: '4100 XOF',
      period: '/ans'
    },
    {
      title: 'Basic',
      specs: [
        'Serveurs privés virtuels (SPV)',
        'A partir de 9400 XOF',
        '4 cœurs de processeur virtuel',
        '10 Go de RAM',
        'Disque HDD 700 Go',
        'Port 100 Mbit/s'
      ],
      price: '4300 XOF',
      period: '/ans'
    },
    {
      title: 'Pro',
      specs: [
        'Serveurs privés virtuels (SPV)',
        'A partir de 15300 XOF',
        '8 cœurs de processeur virtuel',
        '20 Go de RAM',
        'Disque HDD 1.4 To',
        'Port 1 Gbit/s'
      ],
      price: '4500 XOF',
      period: '/ans'
    }
  ];
}
