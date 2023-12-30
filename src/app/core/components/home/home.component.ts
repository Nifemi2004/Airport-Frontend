import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Airline } from 'src/app/shared/models/airline';
import { flightRoute } from 'src/app/shared/models/flight-route';
import { AirlineService } from 'src/app/shared/services/airline.service';
import { FlightRouteService } from 'src/app/shared/services/flight-route.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isChecked = true;
  flightSearchForm!: FormGroup;
  airlines: Airline[] = [];
  flightRoutes: flightRoute[] = [];
  origins: string[] = [];
  destinations: string[] = [];
  airlineId!: number;

  constructor(
    private formbuilder: FormBuilder,
    private airlineService: AirlineService,
    private flightRouteService: FlightRouteService,
    private router: Router
  ) {
    this.flightSearchForm = this.formbuilder.group({
      toggleControl: [true],
      airlineId: [0, [Validators.required]],
      origin: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      departureDate: ['', [Validators.required]],
      returnDate: [''],
      adult: ['', [Validators.required]],
      child: [''],
      infant: [''],
    });

    this.flightSearchForm
      .get('airlineId')
      ?.valueChanges.subscribe((airlineId) => {
        this.onAirlineChange(airlineId);
        this.airlineId = airlineId;
      });

    this.flightSearchForm.get('origin')?.valueChanges.subscribe((origin) => {
      this.onOriginChange(this.airlineId, origin);
    });
  }

  ngOnInit() {
    this.airlineService.getAllAirline().subscribe(
      (response: any[]) => {
        this.airlines = response;
      },
      (error) => {
        console.log(error);
      }
    );
    return this.airlines;
  }

  onToggleChange() {
    if (this.isChecked) {
      this.isChecked = false;
      this.flightSearchForm.controls['returnDate'].disable();
    } else {
      this.isChecked = true;
      this.flightSearchForm.controls['returnDate'].enable();
    }
  }

  onAirlineChange(airlineId: number) {
    this.flightRouteService.getAllFlightRoute(airlineId).subscribe(
      (response: any) => {
        this.flightRoutes = response;
        this.origins = this.flightRoutes.map((items) => items.origin);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onOriginChange(airlineId: number, origin: string) {
    this.flightRouteService.getDestinationByOrigin(airlineId, origin).subscribe(
      (response: any) => {
        this.destinations = response;
        const inputString = this.destinations[0];
        const cleanedString = inputString.replace(/[\[\]']+/g, '');
        this.destinations = cleanedString.split(',');
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    const formGroupValue = this.flightSearchForm.value;
    this.router.navigate(['/flightResult'], {
      queryParams: { airlineId: this.flightSearchForm.controls['airlineId'].value,
                     origin: this.flightSearchForm.controls['origin'].value,
                     destination: this.flightSearchForm.controls['destination'].value,
                     arrivalDate: this.flightSearchForm.controls['returnDate'].value,
                     departureDate: this.flightSearchForm.controls['departureDate'].value },
    });
  }
}
