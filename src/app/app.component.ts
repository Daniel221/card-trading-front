import { AfterContentInit, Component } from '@angular/core';
import { UserService } from './shared/user.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from  './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [UserService]
})
export class AppComponent implements AfterContentInit {

  constructor(private http: HttpClient, private userService: UserService, public _authService: AuthService) { }
  title = 'Card-Trading';
  users = [];
  showChat = false;

  getUsers() {
    this.http.get('http://localhost:3000/u/40000').subscribe((user) => console.log(user));
  }


  ngAfterContentInit(): void {
  }

  displayChat() {
    this.showChat = true;
  }
}
