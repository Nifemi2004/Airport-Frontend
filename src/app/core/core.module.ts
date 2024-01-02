import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from '../shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { StepsModule } from 'primeng/steps';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { FlightResultComponent } from './components/flight-result/flight-result.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ErrorComponent,
    FlightResultComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    ToastModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatSelectModule,
    StepsModule
  ],
  exports: [LoginComponent, HomeComponent, SignupComponent, ErrorComponent],
})
export class CoreModule {}
