import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})



export class HeaderComponent implements OnInit {

  isLogged: boolean = false;

  menuItems = [
    { linkid: 1, name: "Cartas", link: "catalogue" },
    { linkid: 2, name: "Info", link: "info" },
    { linkid: 3, name: "Usuarios", link: "userlist" }
  ];

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this.isLogged = this._authService.loggedIn();
  }

}
