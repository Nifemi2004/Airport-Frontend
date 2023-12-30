import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from 'src/app/shared/services/flight.service';

@Component({
  selector: 'app-flight-result',
  templateUrl: './flight-result.component.html',
  styleUrls: ['./flight-result.component.css'],
})
export class FlightResultComponent {
  constructor(
    private route: ActivatedRoute,
    private flightService: FlightService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const airlineId = params['airlineId'];
      const origin = params['origin'];
      const destination = params['destination'];
      const arrivalDate = params['arrivalDate'];
      const departureDate = params['departureDate'];

      console.log(airlineId)

      this.flightService.getAllFlightByConditions(
        airlineId,
        origin,
        destination,
        arrivalDate,
        departureDate
      ).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      )
    });
  }
}
