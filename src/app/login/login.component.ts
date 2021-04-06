import { Component, OnInit } from '@angular/core';
import { AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  exampleEmail = "ex@mp.le";
  loginUserData:any={};
  logMsg;
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }
  LoginUser(){
    this._auth.loginUser(this.loginUserData).subscribe(
      data => {
        console.log(data);
        localStorage.setItem('token', data.token);
        this._router.navigate(['/userlist']);
      },error=>{
        this.logMsg={msg:"Usuario o contraseña incorrectos.",class:'text-danger'};
      })
  }
}
