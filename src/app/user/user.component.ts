import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, OnInit, AfterContentInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { TradeComponent } from '../trade/trade.component';

declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit, OnChanges {
  appTitle: string;
  user;
  userid;
  myid;
  password = '';
  attributes = {
    name: { value: '', label: 'Name' },
    lastname: { value: '', label: 'Last_Name' },
    username: { value: '', label: 'Username' },
    img: { value: '', label: 'Image url' },
    profiletext: { value: '', label: 'Description' }
  };
  attributesKeys = Object.keys(this.attributes);
  regMsg;
  userCards;
  frens: boolean = false;
  @ViewChild('contactos') contactos;
  @ViewChild('tradeMod') trade: TradeComponent;
  showMenu = {
    cards: true,
    chat: false,
    edit: false
  }

  constructor(private actRoute: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {

    this.actRoute.params.subscribe(p => {
      this.userid = p.id;
      this.http.get<any>('https://card-trading-api-dev.herokuapp.com/u/' + this.userid).subscribe(data => this.user = data);
      this.http.get<any>(`https://card-trading-api-dev.herokuapp.com/c?user=${this.userid}`).subscribe(data => {
        this.showCards();
        this.userCards = data.sort((a,b) => a.cardid - b.cardid);
      });
      this.http.get<any>('https://card-trading-api-dev.herokuapp.com/login?token=' + localStorage.getItem("token")).subscribe(res => {
        this.myid = res.userid;
        this.http.get<any>(`https://card-trading-api-dev.herokuapp.com/u/contacts/${this.userid}?otherId=${this.myid}`).subscribe(data => this.frens = data.length > 0);
      });
    });
  }

  ngOnChanges() {
    this.showCards();
  }

  createUser() {
    if (this.password != this.user.password) {
      this.regMsg = { msg: "Contraseña incorrecta.", class: 'text-danger' };
      return;
    }
    console.log("updating user...");

    const user = {
      name: this.attributes.name.value,
      lastName: this.attributes.lastname.value,
      username: this.attributes.username.value,
      img: this.attributes.img.value,
      profiletext: this.attributes.profiletext.value
    }
    this.http.put<any>('https://card-trading-api-dev.herokuapp.com/u/' + this.user.userid, user).subscribe(data => {
      this.regMsg = { msg: "Usuario actualizado exitosamente.", class: 'text-success' };
      Object.keys(user).forEach(k => {
        if(user[k] != undefined && user[k].length > 0)
        this.user[k] = user[k];
      });
      $("#confirmModal").modal("hide");
    }, error => {
      this.regMsg = { msg: "Error, intente de nuevo más tarde.", class: 'text-danger' };
    })


  }

  onChanged(e) {
    this.password = e.target.value;
  }

  addFrend() {
    if (this.frens) {
      this.trade.reload();
      $("#tradeModal").modal("show");
      return;
    }
    this.http.post<any>('https://card-trading-api-dev.herokuapp.com/u/contacts/' + this.userid, { id: this.myid }).subscribe(data => {
      this.contactos.update();
      this.frens = true;
      //alert("Contacto añadido");
    }, err => {
      alert(err.error.error);
    });
  }

  showCards() {
    this.appTitle = 'Inventario';
    this.closeAll();
    this.http.get<any>(`https://card-trading-api-dev.herokuapp.com/c?user=${this.userid}`).subscribe(data => {
      this.userCards = data.sort((a,b) => a.cardid - b.cardid);
    });
    this.showMenu.cards = true;
  }

  showChat() {
    this.appTitle = 'Mensajería';
    this.closeAll();
    this.showMenu.chat = true;
  }

  showEdit() {
    this.appTitle = this.user?.username;
    this.closeAll();
    this.showMenu.edit = true;
  }
  closeAll() {
    this.showMenu.cards = false;
    this.showMenu.chat = false;
    this.showMenu.edit = false;
  }

}
