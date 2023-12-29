import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (req.url.includes('/auth')) {
      return next.handle(req);
    }

    console.log('entered interceptor')
    const accessToken = sessionStorage.getItem('accessToken');

    const _request = req.clone({
      headers: req.headers
        .set('Authorization', `Bearer ${accessToken}`)
    });

    return next.handle(_request).pipe(
      catchError(error => {
        if(error.status === 403 ){
          console.log(error)
          return this.refreshAccessTokenAndRetry(_request, next);
        }else{
          return throwError(error)
        }
      })
    );
  }

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  private refreshAccessTokenAndRetry(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('entered refresh and retry')
    const accessToken = sessionStorage.getItem('accessToken')

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      console.log('refreshing')
      this.refreshTokenSubject.next(null);

      return this.authService.refreshAccessToken().pipe(
        switchMap((res) => {
          console.log(res)
          const updatedRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          this.isRefreshing = false;
          this.refreshTokenSubject.next(accessToken);

          return next.handle(updatedRequest);
        }),
        catchError(error => {
          if(error.status === 403 && error.error.message.includes('Refresh token has expired!!!')){
            console.log(error, 'error');
            this.isRefreshing = false;
            this.router.navigate(['/login'])
          }
          this.isRefreshing = false;
          return throwError(error);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(() => {
          const updatedRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          return next.handle(updatedRequest);
        })
      );
    }
  }
}

