import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from 'src/app/shared/services/flight.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-flight-result',
  templateUrl: './flight-result.component.html',
  styleUrls: ['./flight-result.component.css'],
})
export class FlightResultComponent {
  items: MenuItem[] | undefined;
  activeIndex: number = 0;
  origin!: string;
  destination!: string;
  stringDepartureDate!: string;
  stringArrivalDate!: string;
  adult!: number;
  price: number = 0;

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightService
  ) {}

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Pick Flight',
      },
      {
        label: 'Passenger',
      },
      {
        label: 'Additional Service',
      },
      {
        label: 'Payment',
      },
      {
        label: 'Confirmation',
      },
    ];

    this.route.queryParams.subscribe((params) => {
      const airlineId = params['airlineId'];
      this.origin = params['origin'];
      this.destination = params['destination'];
      const arrivalDate = params['arrivalDate'];
      const departureDate = params['departureDate'];
      this.adult = params['ad'];

      const formattedArrivalDate = arrivalDate !== '' ? arrivalDate : null;
      const formattedDepartureDate =
        departureDate !== '' ? departureDate : null;

      const [day1, month1, year1] = formattedDepartureDate.split('/');
      const dateObject1 = new Date(`${year1}-${month1}-${day1}T00:00:00`);

      this.stringDepartureDate = dateObject1.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
      });

      const [day2, month2, year2] = formattedArrivalDate.split('/');
      const dateObject2 = new Date(`${year2}-${month2}-${day2}T00:00:00`);

      this.stringArrivalDate = dateObject2.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
      });

      console.log(airlineId);

      this.flightService
        .getAllFlightByConditions(
          airlineId,
          this.origin,
          this.destination,
          formattedDepartureDate,
          formattedArrivalDate
        )
        .subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
        );
    });
  }
}
