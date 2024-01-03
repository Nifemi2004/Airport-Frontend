import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  userAirlineId: number | null | undefined;

  constructor(private authService: AuthService) {
    this.userAirlineId = this.authService.userValue?.airlineId;
    this.initializeSidebar();
  }
  
  initializeSidebar() {
    if (this.userAirlineId !== null) {
      this.sidebarItems = this.sidebarItems.filter(item => item.label !== 'Add Admin');
      this.sidebarItems = this.sidebarItems.filter(item => item.label !== 'Manage Airline');
    }
  }


  sidebarItems: { label: string; link: string }[] = [
    { label: 'Add Admin', link: '/addAdmin' },
    { label: 'Manage Airline', link: '/addAirline' },
    { label: 'Manage Airplanes', link: '/allPlanes' },
    { label: 'Manage Flights', link: '/addFlight' },
  ];

}
