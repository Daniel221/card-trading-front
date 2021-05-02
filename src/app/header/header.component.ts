import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NotisComponent } from '../notis/notis.component';

declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})



export class HeaderComponent implements OnInit {
  @ViewChild("notis") notis:NotisComponent;
  isLogged: boolean = false;
  canCheckIn: boolean = false;
  hasNotis: boolean = false;
  userid: number;
  card={cardid:"ERROR",title:"ERR_0",description:"An unexpected error has ocurred",img:"",type:2};

  menuItems = [
    { linkid: 0, name: "FreeCard", link:"" },
    { linkid: 1, name: "Cartas", link: "catalogue" },
    { linkid: 2, name: "Usuarios", link: "userlist" }
  ];

  constructor(private _authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    if(this.isLogged = this._authService.loggedIn()){
      this.http.get<any>('http://localhost:3000/login?token='+localStorage.getItem("token")).subscribe(res=>{
        this.userid=res.userid;
        this.notis.init(this.userid);
        if(!res.checkin){
          this.canCheckIn=true;
        }else{
          let todayStart=new Date();
          todayStart.setUTCHours(0,0,0,0);
          this.canCheckIn=todayStart.getTime()-res.checkin>0;
        }
      });
    }
  }

  process(){
    if(!this.canCheckIn)return;
    this.canCheckIn=false;
    this.http.put<any>('http://localhost:3000/u/'+this.userid,{checkin:""+Date.now()}).subscribe(data=>{
      this.http.get<any>('http://localhost:3000/c').subscribe(cards=>{
        const cardid=Math.floor(Math.random()*cards.length);
        console.log(cardid);
        this.http.post<any>('http://localhost:3000/c/'+this.userid,{cardid}).subscribe(_=>{
          this.http.get<any>('http://localhost:3000/c/'+cardid).subscribe(card=>{
            this.card=card;
            localStorage.setItem('token', data.token);
            $("#gottenCard").modal("show");
          });
        });
      });
    },err=>console.error(err));
  }

  hasTrades(b){
    this.hasNotis=b;
  }

}
