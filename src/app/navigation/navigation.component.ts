import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';  
import { CommonModule } from '@angular/common';       
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
   isLoggedIn = false;
     isAdmin = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.user$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.isAdmin = user?.email === 'admin@abv.bg';
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
 }
