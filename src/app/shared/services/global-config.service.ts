import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalConfigService {

  accessToken !: string
  constructor() { }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080'
  });

  setAccessToken() {
    this.accessToken = sessionStorage.getItem('accessToken') || '';
    this.headers = this.headers.set('Authorization', `Bearer ${this.accessToken}`);
  }

  setHeader(key: string, value: string) {
    this.headers = this.headers.set(key, value);
  }
}
