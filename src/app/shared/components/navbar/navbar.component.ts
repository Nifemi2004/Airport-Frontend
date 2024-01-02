import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [MessageService]
})
export class NavbarComponent implements OnInit {
  searchQuery!: string;
  isLoggedIn = sessionStorage.getItem('user')
  items: MenuItem[] | undefined;

  constructor( private router: Router, private messageService: MessageService){}
  search(): void {
    console.log('Searching for:', this.searchQuery);
  }

  ngOnInit(): void {
    this.items = [
      {
          label: 'Settings',
          icon: 'pi pi-fw pi-cog',
      },
      {
          label: 'Log-out',
          icon: 'pi pi-fw pi-sign-out',
          command: () => this.logout()
      }
  ];
  }

  public onClickLogin(): void {
    // Navigate to the login page
    this.router.navigate(['/login']);
  }

  public logout = () => {
    sessionStorage.clear();
    this.router.navigate(['/login'])
    this.messageService.add({ severity: 'warn', summary: 'Logout', detail: 'Logged out Successfully' });
  }
}
