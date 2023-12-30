import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConfigService } from './global-config.service';
import { Observable } from 'rxjs';
import { flightRoute } from '../models/flight-route';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlightRouteService {

  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigService
  ) {}

  getAllFlightRoute(airlineId:number): Observable<flightRoute[]> {
    return this.http.get<flightRoute[]>(
      `${environment.baseUrl}/airlines/${airlineId}/flightRoutes`,
      {
        headers: this.globalConfig.headers,
      }
    );
  }

  getDestinationByOrigin(airlineId: number, origin: String): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/airlines/${airlineId}/flightRoute?origin=${origin}`,
      {
        headers: this.globalConfig.headers,
      }
    );
  }

}
