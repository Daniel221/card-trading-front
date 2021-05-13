import { Component, OnInit } from '@angular/core';
import { AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {SocialAuthService} from 'angularx-social-login';
import {SocialUser, GoogleLoginProvider} from 'angularx-social-login';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  exampleEmail = "ex@mp.le";
  loginUserData:any={};
  logMsg;
  socialUser: SocialUser;
  isLoggedin: boolean;
  constructor(private _auth: AuthService, private _router: Router, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      console.log(this.socialUser);
      localStorage.setItem('token', this.socialUser.idToken);
      this._router.navigate(['/userlist']);
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOutGoogle(): void {
    this.socialAuthService.signOut();
  }

  LoginUser(){
    this._auth.loginUser(this.loginUserData).subscribe(
      data => {
        localStorage.setItem('token', data.token);
        this._router.navigate(['/userlist']);
        $("#loginModal").modal("hide");
      },error=>{
        this.logMsg={msg:"Usuario o contraseña incorrectos.",class:'text-danger'};
      })
  }
}
