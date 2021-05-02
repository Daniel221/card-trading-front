import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notis',
  templateUrl: './notis.component.html',
  styleUrls: ['./notis.component.less']
})
export class NotisComponent implements OnInit {
  user;
  @Output() hasTrades=new EventEmitter<boolean>();
  trades:any[];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  updateTrades(){
    this.http.get<any>('http://localhost:3000/u/trades/'+this.user).subscribe(data=>{
      this.trades=data;
      this.hasTrades.emit(this.trades.length>0);
    });
  }

  init(userid){
    this.user=userid;
    this.updateTrades();
  }

  trade(trade,mode){
    console.log(trade,mode);
    const body={
      c1:trade.card1.cardid,
      c2:trade.card2.cardid,
      u1:trade.userid,
      u2:this.user,
      date:trade.date,
      mode:mode?1:2
    }
    this.http.post<any>('http://localhost:3000/u/trades',body).subscribe(data=>{
      alert("Intercambio exitoso");
      this.updateTrades();
    },err=>{
      alert(err);
      this.updateTrades()
    });
  }

}
