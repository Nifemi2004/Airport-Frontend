import { Component } from '@angular/core';
import { Flight } from 'src/app/shared/models/flight';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightService } from 'src/app/shared/services/flight.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-flight-per-airline',
  templateUrl: './add-flight-per-airline.component.html',
  styleUrls: ['./add-flight-per-airline.component.css'],
})
export class AddFlightPerAirlineComponent {
  flights: Flight[] = [];
  newFlight!: Flight;
  isModalOpen = false;
  isNewModalOpen = false;
  flightForm!: FormGroup;
  selectedFlight!: Flight;
  editFlightEvent: any;
  airlineId1: any;

  constructor(
    private flightService: FlightService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.airlineId1 = authService.userValue?.airlineId;
  }

  ngOnInit() {
    this.flightForm = this.formBuilder.group({
      airplaneId: [0, [Validators.required]],
      flightNumber: ['', [Validators.required]],
      origin: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      departureDate: ['', [Validators.required]],
      arrivalDate: ['', [Validators.required]],
      economyPrice: [0, [Validators.required]],
      businessPrice: [0, [Validators.required]],
      firstPrice: [0, [Validators.required]],
      status: ['', [Validators.required]],
    });

    this.flightService.getFlightByAirline(this.airlineId1).subscribe(
      (response: any[]) => {
        this.flights = response;
      },
      (error) => {
        console.log(error);
      }
    );
    return this.flights;
  }

  openEditModal(flight: Flight, index: any) {
    this.isModalOpen = true;
    this.flightForm.setControl(
      'flightNumber',
      this.formBuilder.control(flight.flightNumber, Validators.required)
    );
    this.flightForm.setControl(
      'origin',
      this.formBuilder.control(flight.origin, Validators.required)
    );
    this.flightForm.setControl(
      'destination',
      this.formBuilder.control(flight.destination, Validators.required)
    );
    this.flightForm.setControl(
      'departureDate',
      this.formBuilder.control(flight.departureDate, Validators.required)
    );
    this.flightForm.setControl(
      'arrivalDate',
      this.formBuilder.control(flight.arrivalDate, Validators.required)
    );
    this.flightForm.setControl(
      'economyPrice',
      this.formBuilder.control(flight.economyPrice, Validators.required)
    );
    this.flightForm.setControl(
      'businessPrice',
      this.formBuilder.control(flight.businessPrice, Validators.required)
    );
    this.flightForm.setControl(
      'firstPrice',
      this.formBuilder.control(flight.firstPrice, Validators.required)
    );
    this.flightForm.setControl(
      'status',
      this.formBuilder.control(flight.status, Validators.required)
    );

    // this.flightForm.setValue({
    //   airplaneId: flight.airplaneId,
    //   flightNumber: flight.flightNumber,
    //   origin: flight.origin,
    //   destination: flight.destination,
    //   departureDate: flight.departureDate,
    //   arrivalDate: flight.arrivalDate,
    //   economyPrice: flight.economyPrice,
    //   businessPrice: flight.businessPrice,
    //   firstPrice: flight.firstPrice,
    //   status: flight.status,
    // });

    this.selectedFlight = flight;

  }

  openNewModal() {
    this.isNewModalOpen = true;
  }

  closeNewModal() {
    this.isNewModalOpen = false;
  }

  closeModal() {
    this.isModalOpen = false;
    this.flightForm.reset();
    this.selectedFlight = null as unknown as Flight;
  }

  onEditSubmit() {
    if (this.flightForm.invalid) {
      return;
    }

    this.flightForm.removeControl('airplaneId');


    this.flightService
      .updateFlight(
        this.flightForm.value,
        this.selectedFlight.id,
        this.airlineId1,
        this.selectedFlight.airplaneId
      )
      .subscribe(
        (response) => {
          this.newFlight = response;
        },
        (error) => {
          console.log(error);
        }
      );

    this.selectedFlight = null as unknown as Flight;
    this.flightForm.reset();
    this.isModalOpen = false;
    this.newFlight = null as unknown as Flight;
  }

  onNewSubmit() {
    if (this.flightForm.invalid) {
      return;
    }

    const airplaneId = this.flightForm.value.airplane

    this.flightForm.removeControl('airplaneId')

    this.flightService.createFlight(this.flightForm.value, this.airlineId1, airplaneId).subscribe(
      (response) => {
        this.newFlight = response;
      },
      (error) => {
        console.log(error);
      }
    );

    this.flightForm.reset();
    this.isNewModalOpen = false;
    this.newFlight = null as unknown as Flight;
  }

  onDelete(flight: Flight, index: any) {
    console.log(flight.id!);

    // this.flightService.deleteFlight(flight.id!).subscribe(
    //   (response) => {
    //     alert(response.name);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );

    this.flights.splice(index, 1);
  }
}
