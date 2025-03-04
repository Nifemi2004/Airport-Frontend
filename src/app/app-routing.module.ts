import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './core/components/signup/signup.component';
import { LoginComponent } from './core/components/login/login.component';
import { HomeComponent } from './core/components/home/home.component';
import { AuthGuard } from './shared/services/guards/auth.guard';
import { AdminGuard } from './shared/services/guards/admin.guard';
import { ErrorComponent } from './core/components/error/error.component';
import { AddAdminComponent } from './admin/component/add-admin/add-admin.component';
import { AddFlightComponent } from './admin/component/add-flight/add-flight.component';
import { AddAirlineComponent } from './admin/component/add-airline/add-airline.component';
import { AddPlanesComponent } from './admin/component/add-planes/add-planes.component';
import { FlightResultComponent } from './core/components/flight-result/flight-result.component';
import { AddAirplanePerAirlineComponent } from './airline-admin/add-airplane-per-airline/add-airplane-per-airline.component';
import { AirlineGuard } from './shared/services/guards/airline.guard';
import { AddFlightPerAirlineComponent } from './airline-admin/add-flight-per-airline/add-flight-per-airline.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'addAdmin', component: AddAdminComponent, canActivate: [AdminGuard] },
  {
    path: 'addFlight',
    component: AddFlightComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'addAirline',
    component: AddAirlineComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'allPlanes',
    component: AddPlanesComponent,
    canActivate: [AdminGuard],
  },
  {
    path:'airlinePlanes',
    component: AddAirplanePerAirlineComponent,
    canActivate: [AirlineGuard]
  },
  {
    path:'airlineFlights',
    component: AddFlightPerAirlineComponent,
    canActivate: [AirlineGuard]
  },
  {
    path: 'flightResult',
    component: FlightResultComponent,
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
