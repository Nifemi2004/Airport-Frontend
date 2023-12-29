import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';

import { AddAdminComponent } from './component/add-admin/add-admin.component';
import { AddFlightComponent } from './component/add-flight/add-flight.component';
import { AddAirlineComponent } from './component/add-airline/add-airline.component';
import { AddPlanesComponent } from './component/add-planes/add-planes.component';


@NgModule({
  declarations: [
    AddAdminComponent,
    AddFlightComponent,
    AddAirlineComponent,
    AddPlanesComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    ToastModule,
  ],
})
export class AdminModule { }
