import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Airline } from 'src/app/shared/models/airline';
import { AirlineService } from 'src/app/shared/services/airline.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isChecked = true;
  flightSearchForm!: FormGroup;
  airlines: Airline[] = [];

  constructor(
    private formbuilder: FormBuilder,
    private airlineService: AirlineService
  ) {}

  ngOnInit() {
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

  onSubmit() {
    console.log(this.flightSearchForm.value);
  }
}
