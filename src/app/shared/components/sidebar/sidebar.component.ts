import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  sidebarItems: { label: string; link: string }[] = [
    {label: 'Add Admin', link: '/addAdmin'},
    { label: 'Manage Airline', link: '/addAirline' },
    {label: 'Manage Airplanes', link: '/allPlanes'},
    {label: 'Manage Flights', link: '/addFlight'},
  ];

}
