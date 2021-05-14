import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService} from '../shared/auth.service';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { from, Subscription } from 'rxjs'
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

const API_URL = 'https://card-trading-api-dev.herokuapp.com';
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  user: SocialUser | null;
  form: FormGroup;
  userid: number;

  exampleEmail = "ex@mp.le";
  loginUserData:any={};
  logMsg;
  socialUser: SocialUser;
  isLoggedin: boolean;
  constructor(private _auth: AuthService, private _router: Router, private socialAuthService: SocialAuthService,  private http: HttpClient) { }

  get formLogin(){return this.form.controls;}

  ngOnInit(): void {
    this.user = null;
    this.initForm();
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
    });
  }

  initForm(){
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  LoginUser(){
    //console.log(this.loginUserData);
    this._auth.loginUser(this.loginUserData).subscribe(
      data => {
        //console.log(data);
        localStorage.setItem('token', data.token);
        this.http.get<any>(`${API_URL}/login?token=${localStorage.getItem("token")}`).subscribe(res => {
          this.userid = res.userid;
          this._router.navigate(['/user/'+this.userid]);
          $("#loginModal").modal("hide");
        });  
      },error=>{
        this.logMsg={msg:"Usuario o contraseña incorrectos.",class:'text-danger'};
    })
  }

  signWithGoogle() {
    from(this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)).subscribe({
      next: (user: SocialUser) => {
        this._auth.login(user);
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
}
