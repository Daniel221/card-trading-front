import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})

export class HeaderComponent implements OnInit {
  //isLogged: boolean = false;
  user: SocialUser | null;
  loggedIn: boolean = this._authService.isLoggedIn();

  menuItems = [
    { linkid: 1, name: "Cartas", link: "catalogue" },
    { linkid: 2, name: "Info", link: "info" },
    { linkid: 3, name: "Usuarios", link: "userlist" }
  ];

  constructor(public _authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    //this.isLogged = this._authService.loggedIn();
    this._authService.user$.subscribe((user) => {
      this.user = user
      this.loggedIn = this._authService.isLoggedIn()
    });
  }

  onLogout() {
    this._authService.logout();
    this.router.navigate(['/login']);
  }

}
