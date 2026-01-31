import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../partials/header/header';
import { FooterComponent } from '../../partials/footer/footer';

@Component({
  selector: 'app-guest-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './guest-layout.html',
  styleUrls: ['./guest-layout.css']
})
export class GuestLayoutComponent {

}
