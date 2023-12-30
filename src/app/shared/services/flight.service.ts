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
    departureDate: String,
    arrivalDate: String
  ): Observable<Flight[]> {
    return this.http.get<Flight[]>(
      `${environment.baseUrl}/airlines/${airlineId}/flight?origin=${origin}&destination=${destination}&arrivalDate=${arrivalDate}&departureDate=${departureDate}`,
      {
        headers: this.globalConfig.headers,
      }
    );
  }
}
