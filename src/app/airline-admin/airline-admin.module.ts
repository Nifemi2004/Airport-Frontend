import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';

import { AddFlightPerAirlineComponent } from './add-flight-per-airline/add-flight-per-airline.component';
import { AddAirplanePerAirlineComponent } from './add-airplane-per-airline/add-airplane-per-airline.component';



@NgModule({
  declarations: [
    AddFlightPerAirlineComponent,
    AddAirplanePerAirlineComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    ToastModule, 
   ]
})
export class AirlineAdminModule { }
