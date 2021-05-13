import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService} from './auth.service' 
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { catchError, finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
  private pendingRequests = 0;
  private filteredUrlPatterns: RegExp[] = [];
  private pendingRequestsStatus: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(private router: Router) { 
    router.events.subscribe(event=>{
      if(event instanceof NavigationStart){
        this.pendingRequestsStatus.next(true);
      }
      if(event instanceof NavigationError || event instanceof NavigationEnd || event instanceof NavigationCancel){
        this.pendingRequestsStatus.next(false);
      }
    });
  }

  private shouldByPass(url: string): boolean{
    return this.filteredUrlPatterns.some(e=>{
      return e.test(url);
    });
  }  

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const shouldByPass = this.shouldByPass(req.url);
    const token: string = localStorage.getItem('token');
    if(token){
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    }
    if(!req.headers.has('Content-Type')){
      req = req.clone({ headers: req.headers.set('Content-Type', 'aplication/json') });
    }
    req = req.clone({ headers: req.headers.set('Accept', 'aplication/json') });

    if(!shouldByPass){
      this.pendingRequests++;
      if(1 === this.pendingRequests){
        this.pendingRequestsStatus.next(true);
      }
    }
    return next.handle(req).pipe(
      map(event=>{
        return event;
      }),
      catchError(error=>{
        return throwError(error);
      }),
      finalize(()=>{
        if(!shouldByPass){
          this.pendingRequests--;

          if(0 === this.pendingRequests){
            this.pendingRequestsStatus.next(false);
          }
        }
      })
    );
  }
}
