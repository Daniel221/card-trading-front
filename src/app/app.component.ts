import { AfterContentInit, Component, OnInit } from '@angular/core';
import { UserService } from './shared/user.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [UserService]
})
export class AppComponent implements AfterContentInit, OnInit {

  constructor(private http: HttpClient, private userService: UserService, public _authService: AuthService) { }
  title = 'Card-Trading';
  users = [];
  showChat: boolean = false;
  isLoggedIn: boolean = false;

  getUsers() {
    this.http.get('http://localhost:3000/u/40000').subscribe((user) => console.log(user));
  }

  ngOnInit() {
    this.isLoggedIn = this._authService.loggedIn();
  }

  ngAfterContentInit(): void {
  }

  displayChat() {
    this.showChat = true;
  }

  notDisplayChat() {
    this.showChat = false;
  }
}
