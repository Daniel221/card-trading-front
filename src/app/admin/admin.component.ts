import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TradeComponent } from '../trade/trade.component';
import { catchError, map, tap } from 'rxjs/operators';

declare var $: any;
const API_URL = 'https://card-trading-api-dev.herokuapp.com/';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {
  cartas: any[] = [];
  newCard: any = {};
  newImg: string = "";
  attributesKeys: any[];
  reader = new FileReader();
  cardComplete: boolean = false;
  file;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {
    Object.assign(this.newCard, TradeComponent.defaultCard);
    this.attributesKeys = Object.keys(this.newCard);
    this.reader.addEventListener("load", () => {
      this.newCard.img = (this.reader.result);
    });
  }

  ngOnInit(): void {
    if (!this.authService.loggedIn()) this.router.navigate(["/"]);
    this.http.get<any>(`${API_URL}/login?token=${localStorage.getItem("token")}`).subscribe(res => {
      this.http.get<any>(`${API_URL}/u/${res.userid}`).subscribe(data => {
        if (data.role != "admin") this.router.navigate(["/"]);
      });
    });
    this.http.get<any>(`${API_URL}/c`).pipe(tap(a => { })).subscribe(data => this.cartas = data);
    $('#deletus').hide();
  }

  refreshCards(died) {
    alert("updated");
    this.http.get<any>(`${API_URL}/c`).pipe(tap(a => { })).subscribe(data => this.cartas = data);
    /*const card=this.cartas.findIndex(c=>c.cardid==this.newCard.cardid);
    if(card<0) this.cartas.push(this.newCard);
    else{
      if(died) this.cartas.splice(card,1);
      else Object.assign(this.cartas[card],this.newCard);
    }*/
  }

  selectCard(c) {
    Object.assign(this.newCard, c);
    this.checkDeletus();
  }

  verify() {
    $('#saveCard').prop('disabled', !(this.newCard.cardid >= 0 && this.newCard.cardid <= this.cartas.length && this.newCard.type > -1 && this.attributesKeys.slice(1, 4).every(k => this.newCard[k].length > 0)));
    this.checkDeletus();
  }

  checkDeletus() {
    if (this.newCard.cardid < this.cartas.length) $('#deletus').show();
    else $('#deletus').hide();
  }

  clear() {
    Object.assign(this.newCard, TradeComponent.defaultCard);
    $('#saveCard').prop('disabled', true);
    $('#deletus').hide();
  }

  createCard() {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file);
      this.http.post(`${API_URL}/file`, formData).subscribe();
      this.file = undefined;
      $("#fileInput").val("");
    }
    this.newCard.img = `${API_URL}/${this.newCard.cardid}.png`;

    if (this.cartas.find(c => c.cardid == this.newCard.cardid))
      this.http.put<any>(`${API_URL}/c`, this.newCard).subscribe(_ => this.refreshCards(false));
    else
      this.http.post<any>(`${API_URL}/c`, this.newCard).subscribe(_ => this.refreshCards(false));
    this.http.get<any>(`${API_URL}/${this.newCard.cardid}.png`).subscribe(_ => { }, err => console.log("Este error es a propósito"));
  }

  deleteCard() {
    this.http.delete<any>(`${API_URL}/c/${this.newCard.cardid}`).subscribe(_ => this.refreshCards(true));
  }

  onChange(thing, event) {
    this.newCard[thing] = event.target.value;
    this.verify();
  }

  fileChanged(e) {
    if (e.target.files.length < 1) return;
    const file = e.target.files[0];
    const fail = file.slice(0, file.size, 'image/*');
    this.file = new File([fail], this.newCard.cardid + ".png", { type: 'image/*' });
    this.reader.readAsDataURL(e.target.files[0]);
    this.verify();
  }

}
