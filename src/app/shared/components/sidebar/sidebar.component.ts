import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AirlineService } from '../../services/airline.service';
import { Airline } from '../../models/airline';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  userAirlineId: any;
  airline!: any;

  constructor(
    private authService: AuthService,
    private airlineService: AirlineService
  ) {
    this.userAirlineId = this.authService.userValue?.airlineId;
    this.initializeSidebar();
  }

  ngOnInit(): void {
    if (this.userAirlineId) {
      this.airlineService.getAirlineById(this.userAirlineId).subscribe(
        (response: any) => {
          this.airline = response.name.toUpperCase();
        },
        (error) => {
          console.log(error);
        }
      );
    }else{
      this.airline = "NIPORT-AIR"
    }

  }
  initializeSidebar() {
    if (this.userAirlineId !== null) {
      this.sidebarItems = this.sidebarItems.filter(
        (item) => item.label !== 'Add Admin'
      );
      this.sidebarItems = this.sidebarItems.filter(
        (item) => item.label !== 'Manage Airline'
      );
    }
  }

  sidebarItems: { label: string; link: string }[] = [
    { label: 'Add Admin', link: '/addAdmin' },
    { label: 'Manage Airline', link: '/addAirline' },
    { label: 'Manage Airplanes', link: '/allPlanes' },
    { label: 'Manage Flights', link: '/addFlight' },
  ];
}
