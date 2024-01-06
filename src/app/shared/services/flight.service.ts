import { Injectable } from '@angular/core';
import { Flight } from '../models/flight';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GlobalConfigService } from './global-config.service';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigService
  ) {}

  createFlight(
    newFlight: Flight,
    airlineId?: number,
    airplaneId?: number
  ): Observable<Flight> {
    return this.http.post<Flight>(
      `${environment.baseUrl}/airlines/${airlineId}/airplane/${airplaneId}/flight`,
      newFlight,
      { headers: this.globalConfig.headers }
    );
  }

  getFlightByAirline(airlineId?: number): Observable<Flight[]> {
    return this.http.get<Flight[]>(
      `${environment.baseUrl}/airline/${airlineId}/airplane/flights`,
      {
        headers: this.globalConfig.headers,
      }
    );
  }

  getAllFlightByConditions(
    airlineId: number,
    origin: string,
    destination: string,
    departureDate: string,
    arrivalDate: string
  ): Observable<Flight[]> {
    let queryParams = `origin=${origin}&destination=${destination}`;

    if (arrivalDate) {
      queryParams += `&arrivalDate=${arrivalDate}`;
    } else {
      queryParams += `&arrivalDate=null`;
    }

    if (departureDate) {
      queryParams += `&departureDate=${departureDate}`;
    } else {
      queryParams += `&departureDate=null`;
    }

    return this.http.get<Flight[]>(
      `${environment.baseUrl}/airline/${airlineId}/airplane/flight?${queryParams}`,
      {
        headers: this.globalConfig.headers,
      }
    );
  }

  getAllFlightByLowestPrice(airlineId: number, origin:string, destination:string): Observable<Flight[]> {
    let queryParams = `origin=${origin}&destination=${destination}`;


    return this.http.get<Flight[]>(
      `${environment.baseUrl}/airline/${airlineId}/airplane/flightsPerDay?${queryParams}`,
      {
        headers: this.globalConfig.headers,
      }
    );
  }

  updateFlight(
    updatedFlight: Flight,
    id?: number,
    airlineId?: number,
    airplaneId?: number
  ): Observable<Flight> {
    return this.http.post<Flight>(
      `${environment.baseUrl}/airlines/${airlineId}/airplane/${airplaneId}/flight/${id}`,
      updatedFlight,
      { headers: this.globalConfig.headers }
    );
  }
}
