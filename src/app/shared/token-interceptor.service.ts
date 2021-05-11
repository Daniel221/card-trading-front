import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService} from './auth.service' 

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements  HttpInterceptor{
  constructor(private injector: Injector) { }
  intercept(req, next){
    let auths = this.injector.get(AuthService);
    let treq = req.clone({
      setHeaders:{
        authorization: `Bearer ${auths.getToken()}`
      }
    })
    return next.handle(treq);
  }
}
