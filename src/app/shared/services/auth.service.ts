import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;
    refreshToken!: string;

    constructor(private http: HttpClient, private router: Router) {
      this.userSubject = new BehaviorSubject(
        JSON.parse(sessionStorage.getItem('user')!)
      );
      this.user = this.userSubject.asObservable();
    }

    public get userValue() {
      return this.userSubject.value;
    }

    createUser(newUser: User): Observable<User> {
      return this.http
        .post<User>(`${environment.baseUrl}/auth/register`, newUser)
        .pipe(
          map((user) => {
            console.log(user.accessToken, 'breadstew');
            sessionStorage.setItem('accessToken', user.accessToken);
            sessionStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
          })
        );
    }

    loginUser(loggedInUser: User): Observable<User> {
      return this.http
        .post<User>(`${environment.baseUrl}/auth/login`, loggedInUser)
        .pipe(
          map((user) => {
            console.log(user)
            sessionStorage.setItem('accessToken', user.accessToken);
            sessionStorage.setItem('refreshToken', user.refreshToken);
            sessionStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
          })
        );
    }

    refreshAccessToken(): Observable<any> {
      this.refreshToken = sessionStorage.getItem('refreshToken') || '';

      const parsedResponse = { refreshToken: this.refreshToken };
      console.log(parsedResponse)

      return this.http
        .post<any>(`${environment.baseUrl}/auth/refreshtoken`, parsedResponse)
        .pipe(map((response) => {
          console.log(response)
          sessionStorage.setItem('accessToken', response.accessToken)
        }));
    }

}
