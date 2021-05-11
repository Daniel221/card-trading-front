import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { from, Subscription } from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  user: SocialUser | null;

  exampleEmail = "ex@mp.le";
  loginUserData:any={};
  logMsg;
  socialUser: SocialUser;
  isLoggedin: boolean;
  constructor(private _auth: AuthService, private _router: Router, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.user = null;

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      console.log(this.socialUser);
      localStorage.setItem('token', this.socialUser.idToken);
      //this._router.navigate(['']);
    });
  }

  signWithGoogle() {
    from(this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)).subscribe({
      next: (user: SocialUser) => {
        this._auth.login(user);
        this._router.navigate(['/userlist']);
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  /*loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOutGoogle(): void {
    this.socialAuthService.signOut();
  }*/

  LoginUser(){
    this._auth.loginUser(this.loginUserData).subscribe(
      data => {
        localStorage.setItem('token', data.token);
        this._router.navigate(['/userlist']);
        location.reload();
      },error=>{
        this.logMsg={msg:"Usuario o contraseña incorrectos.",class:'text-danger'};
      })
  }
}
