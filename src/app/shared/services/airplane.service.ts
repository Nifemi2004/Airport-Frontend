import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConfigService } from './global-config.service';
import { Observable } from 'rxjs';
import { Airplane } from '../models/airplane';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AirplaneService {
  constructor(
    private http: HttpClient,
    private globalConfig: GlobalConfigService
  ) {}

  getAllAirplane(): Observable<Airplane[]> {
    return this.http.get<Airplane[]>(
      `${environment.baseUrl}/airline/airplanes`,
      {
        headers: this.globalConfig.headers,
      }
    );
  }

  createAirplane(newAirplane: Airplane, id?: number): Observable<Airplane> {
    return this.http.post<Airplane>(
      `${environment.baseUrl}/airlines/${id}/airplane`,
      newAirplane,
      { headers: this.globalConfig.headers }
    );
  }

  updateAirplane(
    updatedAirplane: Airplane,
    id?: number,
    airlineId?: number
  ): Observable<Airplane> {
    return this.http.post<Airplane>(
      `${environment.baseUrl}/airlines/${airlineId}/airplane/${id}`,
      updatedAirplane,
      { headers: this.globalConfig.headers }
    );
  }

  deleteAirplane(id?: number, airlineId?: number): Observable<any> {
    return this.http.delete<any>(
      `${environment.baseUrl}/airlines/${airlineId}/airplane/${id}`,
      {
        headers: this.globalConfig.headers,
      }
    );
  }
}
