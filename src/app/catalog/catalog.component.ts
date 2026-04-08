import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalog',
   standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent {
  products = [
    {
      id: 1,
      name: 'Чаша „Малкият принц“',
      description: 'Малка чаша за големи мечти и тихи вечери под звездите.',
      price: '14.90',
      imageUrl: 'assets/images/малкия-принц-чаша.jpg'
    },
    {
      id: 2,
      name: 'Тениска „Малка планета“',
      description: 'Памучна тениска с илюстрация от света на Малкия принц.',
      price: '19.90',
      imageUrl: 'assets/images/0T-8.jpg'
    },
    {
      id: 3,
      name: 'Фигурка Малкия принц',
      description: 'Малка фигурка от любимата приказка.',
      price: '9.90',
      imageUrl: 'assets/images/IMG_9116-1024x768.jpeg'
    }
  ];
}
