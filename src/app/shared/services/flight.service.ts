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

  getAllFlightByConditions(
    airlineId: number,
    origin: string,
    destination: string,
    departureDate: string,
    arrivalDate: string
  ): Observable<Flight[]> {
    // Build the query parameters dynamically
    let queryParams = `origin=${origin}&destination=${destination}`;
  
    if (arrivalDate) {
      queryParams += `&arrivalDate=${arrivalDate}`;
    }else{
      queryParams += `&arrivalDate=null`;
    }
  
    if (departureDate) {
      queryParams += `&departureDate=${departureDate}`;
    }else{
      queryParams += `&departureDate=null`;
    }
  
    return this.http.get<Flight[]>(
      `${environment.baseUrl}/airline/${airlineId}/airplane/flight?${queryParams}`,
      {
        headers: this.globalConfig.headers,
      }
    );
  }
  
}
