import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  searchQuery!: string;
  isLoggedIn = sessionStorage.getItem('user')

  constructor( private router: Router){}
  search(): void {
    console.log('Searching for:', this.searchQuery);
  }

  public onClickLogin(): void {
    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}
