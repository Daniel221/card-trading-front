import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { NotisComponent } from '../notis/notis.component';

declare var $: any;
const API_URL = 'https://card-trading-api-dev.herokuapp.com';
//'https://card-trading-api-dev.herokuapp.com';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  user: SocialUser | null;
  loggedIn: boolean = this._authService.isLoggedIn();
  
  @ViewChild("notis") notis: NotisComponent;
  isLogged: boolean = false;
  isAdmin: boolean = false;
  canCheckIn: boolean = false;
  hasNotis: boolean = false;
  userid: number;
  cartita = { cardid: "ERROR", title: "ERR_0", description: "An unexpected error has ocurred", img: "", type: 2 };
  interval:any;
  card = { cardid: "ERROR", title: "ERR_0", description: "An unexpected error has ocurred", img: "", type: 2 };

  menuItems = [
    { linkid: 0, name: "Reclamar Carta", link: "" },
    { linkid: 1, name: "Cartas", link: "catalogue" },
    { linkid: 2, name: "Usuarios", link: "userlist" }
  ];

  constructor(public _authService: AuthService, private router: Router,  private http: HttpClient) { }

  ngOnInit(): void {
    this._authService.user$.subscribe((user) => {
      this.user = user
      if(!(this.loggedIn = this._authService.isLoggedIn())) {
        this.interval=setInterval(() => {
          if(this.loggedIn = this._authService.isLoggedIn()){
            clearInterval(this.interval);
            this.updateHeader();
          }
        }, 2000);
        return;
      }
      this.updateHeader();
    });
  }

  updateHeader(){
    this.http.get<any>(`${API_URL}/login?token=${localStorage.getItem("token")}`).subscribe(res => {
      this.userid = res.userid;
      this.http.get<any>(`${API_URL}/u/${this.userid}`).subscribe(res => {
        this.isAdmin = res.role === "admin";
      });
      this.notis.init(this.userid);
      if (!res.checkin) {
        this.canCheckIn = true;
      } else {
        let todayStart = new Date();
        todayStart.setUTCHours(0, 0, 0, 0);
        this.canCheckIn = todayStart.getTime() - res.checkin > 0;
      }
    });
  }

  process() {
    if (!this.canCheckIn) return;
    this.canCheckIn = false;
    this.http.put<any>(`${API_URL}/u/` + this.userid, { checkin: "" + Date.now() }).subscribe(data => {
      this.http.get<any>(`${API_URL}/c`).subscribe(cards => {
        const cardids = cards.map(c=>c.cardid);
        const cardid = Math.floor(Math.random() * cardids.length);
        this.http.post<any>(`${API_URL}/c/` + this.userid, { cardid: cardids[cardid] }).subscribe(_ => {
          this.http.get<any>(`${API_URL}/c/` + cardids[cardid]).subscribe(card => {
            this.card = card;
            localStorage.setItem('token', data.token);
            $("#gottenCard").modal("show");
          });
        });
      });
    }, err => console.error(err));
  }

  menuClick(e){
    e.stopPropagation();
  }

  hasTrades(b) {
    this.hasNotis = b;
  }
  
  onLogout() {
    this._authService.logout();
    this.updateHeader();
  }

  showCard(e){
    this.cartita=e;
    $("#cardDetail").modal("show");
  }

}
