import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';

@Component({
  selector: 'app-advantages',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [provideIcons({ lucideCheck })],
  templateUrl: './advantages.html',
  styleUrls: ['./advantages.css']
})
export class AdvantagesComponent {

}
