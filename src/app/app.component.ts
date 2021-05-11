import { AfterContentInit, Component, OnInit } from '@angular/core';
import { UserService } from './shared/user.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from  './shared/auth.service';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [UserService]
})
export class AppComponent implements AfterContentInit, OnInit {

  constructor(private http: HttpClient, private userService: UserService, public _authService: AuthService, private router: Router) { }
  title = 'Card-Trading';
  users = [];
  showChat: boolean = false;
  //isLoggedIn: boolean = false;

  getUsers() {
    this.http.get('https://card-trading-api-dev.herokuapp.com/u/40000').subscribe((user) => console.log(user));
  }

  ngOnInit() {
    //this.isLoggedIn = this._authService.loggedIn();
    
  }

  ngAfterContentInit(): void {
  }
}
