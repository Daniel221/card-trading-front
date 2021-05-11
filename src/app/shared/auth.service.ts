import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { BehaviorSubject, from, Subject } from "rxjs";

@Injectable()
export class AuthService {
  user$: BehaviorSubject<SocialUser | null> = new BehaviorSubject(this.getUser());
  constructor(private http: HttpClient, private socialService: SocialAuthService, private _router: Router) {}
  private _loginUrl = "http://localhost:3000/login"

  loginUser(user){
    return this.http.post<any>(this._loginUrl, user)
  }
  loggedIn(){
    return !!localStorage.getItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
  }
  logoutUser(){
    localStorage.removeItem('token');
    this._router.navigate(['']);
  }
  

  getUser() {
    const user = localStorage.getItem('user');
    console.log(user)
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  login(user: SocialUser) {
    this.user$.next(user);
    this.http.get('http://localhost:3000/login', {
      headers: {
        'Authorization': `Bearer ${user?.idToken}`
      }
    }).subscribe(response => {
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.socialService.signOut()
    this.user$.next(null);
  }

  isLoggedIn() {
    return Boolean(this.user$.value);
  }
}
