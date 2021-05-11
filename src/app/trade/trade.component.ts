import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.less']
})
export class TradeComponent implements OnInit {
  @Input() user1:number;
  @Input() user2:number;
  @Input() username:string;
  usersCards:any[]=[null,null];
  static defaultCard={cardid:-1,title:"",description:"",img:"",type:"tmp"};
  selCards:any[]=[TradeComponent.defaultCard,TradeComponent.defaultCard];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.reload();
  }
  
  reload(){
    this.usersCards=[null,null];
    $("#confirmTrade").prop('disabled', true);
    this.http.get<any>(`http://localhost:3000/c?user=${this.user1}`).subscribe(data=>this.usersCards[0]=data);
    this.http.get<any>(`http://localhost:3000/c?user=${this.user2}`).subscribe(data=>this.usersCards[1]=data);
    this.selCards[0]=TradeComponent.defaultCard;
    this.selCards[1]=TradeComponent.defaultCard;
  }

  selectInv(inv,card){
    this.selCards[parseInt(inv)]=this.usersCards[inv].find(e=>e.cardid==card);
    $("#confirmTrade").prop('disabled', !this.selCards.every(v=>v.img.length>0));
  }

  addTrade(){
    $("#tradeModal").modal("hide");
    this.http.post<any>(`http://localhost:3000/u/trades`,{ u1:this.user1,u2:this.user2,c1:this.selCards[0].cardid,c2:this.selCards[1].cardid,date:Date.now(),mode:0 }).subscribe(data=>{});
  }

}
