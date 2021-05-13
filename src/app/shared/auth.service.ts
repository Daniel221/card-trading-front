import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { BehaviorSubject, from, Subject } from "rxjs";
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment'

const API_URL = 'http://localhost:3000';

@Injectable()
export class AuthService {
  userid: number;
  user$: BehaviorSubject<SocialUser | null> = new BehaviorSubject(this.getUser());
  constructor(
    private http: HttpClient,
    private socialService: SocialAuthService, 
    private _router: Router
  ) {}
  private _loginUrl = "http://localhost:3000/login";

  loginUser(user) {
    //console.log(user);
    return this.http.post<any>(this._loginUrl, user);
    /*.subscribe(response => {
      console.log(response);
      localStorage.setItem('token', response.token);
    });*/
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
    //console.log(user)
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  login(user: SocialUser) {
    this.user$.next(user);
    //console.log("token de login con google", `Bearer ${user?.idToken}`);
    this.http.get<any>('http://localhost:3000/login', {
      headers: {
        'Authorization': `Bearer ${user?.idToken}`
      }
    }).subscribe(response => {
      localStorage.setItem('token', response.token);
      this.http.get<any>(`${API_URL}/login?token=${localStorage.getItem("token")}`).subscribe(res => {
        this.userid = res.userid;
        //console.log(this.userid);
        //console.log('/user/'+this.userid);
        this._router.navigate(['/user/'+this.userid]);
        //location.reload();
      });  
    });
  }

  logout() {
    if(localStorage.getItem('user')){
      localStorage.removeItem('user');
      this.socialService.signOut()
      this.user$.next(null);
    }else
      localStorage.removeItem('token');
  }

  isLoggedIn() {
    if(this.user$.value)
      return Boolean(this.user$.value);
    return !!localStorage.getItem('token');
  }
}
