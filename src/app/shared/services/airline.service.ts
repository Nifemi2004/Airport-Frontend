import { Injectable } from '@angular/core';
import { Airline } from '../models/airline';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GlobalConfigService } from './global-config.service';

@Injectable({
  providedIn: 'root',
})
export class AirlineService {
  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigService
  ) {}

  getAllAirline(): Observable<Airline[]> {
    return this.http.get<Airline[]>(`${environment.baseUrl}/airlines`, {
      headers: this.globalConfig.headers,
    });
  }

  createAirline(newAirline: Airline): Observable<Airline> {
    return this.http.post<Airline>(
      `${environment.baseUrl}/airlines`,
      newAirline,
      { headers: this.globalConfig.headers }
    );
  }

  updateAirline(updatedAirline: Airline, id?: number): Observable<Airline> {
    return this.http.post<Airline>(
      `${environment.baseUrl}/airlines/${id}`,
      updatedAirline,
      { headers: this.globalConfig.headers }
    );
  }

  deleteAirline(id?: number): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/airlines/${id}`, {
      headers: this.globalConfig.headers,
    });
  }
}
