import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']  
})
export class DetailsComponent implements OnInit {  
  product: any = null;

  products = [
    { id: 1, name: 'Чаша „Малкият принц“', description: 'Малка чаша, вдъхновена от света на Малкия принц. Подходяща за топъл чай, кафе и тихи моменти под звездите. Понякога най-важните неща са тези, които не се виждат с очите.', price: '14.90', imageUrl: 'assets/images/малкия-принц-чаша.jpg' },
    { id: 2, name: 'Тениска „Малка планета“', description: 'Памучна тениска с илюстрация от света на Малкия принц.', price: '19.90', imageUrl: 'assets/images/0T-8.jpg' },
    { id: 3, name: 'Фигурка Малкия принц', description: 'Малка фигурка от любимата приказка.', price: '9.90', imageUrl: 'assets/images/IMG_9116-1024x768.jpeg' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.products.find(p => p.id === id);
  }
}
