import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronLeft, lucideChevronRight } from '@ng-icons/lucide';

@Component({
  selector: 'app-auth-carousel',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [provideIcons({ lucideChevronLeft, lucideChevronRight })],
  templateUrl: './auth-carousel.html',
  styleUrls: ['./auth-carousel.css'],
  host: {
    class: 'w-full block flex-1 flex-shrink-0'
  }
})
export class AuthCarouselComponent {
  currentSlide = signal(0);

  advantages = [
    {
      title: 'Avantages 1',
      description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et'
    },
    {
      title: 'Avantages 2',
      description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et'
    },
    {
      title: 'Avantages 3',
      description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et'
    }
  ];

  nextSlide() {
    this.currentSlide.update(current =>
      current === this.advantages.length - 1 ? 0 : current + 1
    );
  }

  previousSlide() {
    this.currentSlide.update(current =>
      current === 0 ? this.advantages.length - 1 : current - 1
    );
  }

  goToSlide(index: number) {
    this.currentSlide.set(index);
  }
}
