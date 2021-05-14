import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notis',
  templateUrl: './notis.component.html',
  styleUrls: ['./notis.component.less']
})
export class NotisComponent implements OnInit {
  user;
  @Output() hasTrades = new EventEmitter<boolean>();
  trades: any[];
  @Output() cartita=new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  updateTrades() {
    this.http.get<any>('https://card-trading-api-dev.herokuapp.com/u/trades/' + this.user).subscribe(data => {
      this.trades = data;
      this.hasTrades.emit(this.trades.length > 0);
    });
  }

  init(userid) {
    this.user = userid;
    this.updateTrades();
  }

  trade(trade, mode) {
    const body = {
      c1: trade.card1.cardid,
      c2: trade.card2.cardid,
      u1: trade.userid,
      u2: this.user,
      date: trade.date,
      mode: mode ? 1 : 2
    }
    this.http.post<any>('https://card-trading-api-dev.herokuapp.com/u/trades', body).subscribe(data => {
      const tradeo=this.trades.find(t=>t.userid===trade.userid&&t.date===trade.date);
      if(tradeo) tradeo.tmsg = { msg: `Intercambio ${mode?"aceptado":"rechazado"}`, class: "success" };
      setTimeout(()=>this.updateTrades(),1000);
    }, err => {
      const tradeo=this.trades.find(t=>t.userid===trade.userid&&t.date===trade.date);
      console.log(err);
      if(tradeo) tradeo.tmsg = { msg: err.error.error, class: "error" };
      setTimeout(()=>this.updateTrades(),1000);
    });
  }

  showBig(card){
    this.cartita.emit(card);
  }

}
