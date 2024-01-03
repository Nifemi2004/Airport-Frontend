import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFlightPerAirlineComponent } from './add-flight-per-airline/add-flight-per-airline.component';
import { AddAirplanePerAirlineComponent } from './add-airplane-per-airline/add-airplane-per-airline.component';



@NgModule({
  declarations: [
    AddFlightPerAirlineComponent,
    AddAirplanePerAirlineComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AirlineAdminModule { }
