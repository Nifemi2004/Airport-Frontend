// carousel.component.ts
import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { FlightService } from '../../services/flight.service';
import { ActivatedRoute } from '@angular/router';
import { Flight } from '../../models/flight';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('slide', [
      transition(':increment', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-in-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(100%)' }),
        animate('500ms ease-in-out', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class CarouselComponent {
  currentIndex = 0;
  items: Flight[] = [];

  constructor(private flightService: FlightService, private route: ActivatedRoute,
    ) {}


  ngOnInit() {

    this.route.queryParams.subscribe((params) => {
      const airlineId = params['airlineId'];
      const origin = params['origin'];
      const destination = params['destination']

      this.flightService.getAllFlightByLowestPrice(airlineId, origin, destination).subscribe(
        (data) => {
          this.items = data;
          console.log(this.items)
        },
        (error) => {
          console.error('Error loading carousel data:', error);
        }
      );
    })
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 3) % this.totalItems;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 3 + this.totalItems) % this.totalItems;
  }

  get totalItems() {
    return this.items.length;
  }
}
