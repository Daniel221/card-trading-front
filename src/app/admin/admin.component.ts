import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TradeComponent } from '../trade/trade.component';

declare var $:any;
const API_URL = 'http://localhost:3000';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {
  cartas:any[]=[];
  newCard:any={};
  newImg:string="";
  attributesKeys:any[];
  reader = new FileReader();
  cardComplete:boolean=false;
  file;

  constructor(private authService:AuthService, private router: Router, private http:HttpClient) {
    Object.assign(this.newCard, TradeComponent.defaultCard);
    this.attributesKeys=Object.keys(this.newCard);
    this.reader.addEventListener("load",()=>{
      this.newCard.img=(this.reader.result);
    });
  }

  ngOnInit(): void {
    if(!this.authService.loggedIn())this.router.navigate(["/"]);
    this.http.get<any>(`${API_URL}/login?token=${localStorage.getItem("token")}`).subscribe(res=>{
      this.http.get<any>(`${API_URL}/u/${res.userid}`).subscribe(data=>{
        if(data.role!="admin")this.router.navigate(["/"]);
      });
    });
    this.http.get<any>(`${API_URL}/c`).pipe().subscribe(data=>this.cartas=data);
    $('#deletus').hide();
  }

  refreshCards(){
    alert("updated")
    this.http.get<any>(`${API_URL}/c`).subscribe(data=>this.cartas=data);
    //this.http.get<any>(`${API_URL}/c`).subscribe(_=>this.http.get<any>(`${API_URL}/c`).subscribe(data=>this.cartas=data));
  }

  selectCard(c){
    Object.assign(this.newCard,c);
    this.checkDeletus();
  }

  verify(){
    $('#saveCard').prop('disabled',!(this.newCard.cardid>=0&&this.newCard.cardid<=this.cartas.length&&this.newCard.type>-1&&this.attributesKeys.slice(1,4).every(k=>this.newCard[k].length>0)));
    this.checkDeletus();
  }

  checkDeletus(){
    if(this.newCard.cardid < this.cartas.length) $('#deletus').show();
    else $('#deletus').hide();
  }

  clear(){
    Object.assign(this.newCard, TradeComponent.defaultCard);
    $('#saveCard').prop('disabled', true);
    $('#deletus').hide();
  }

  uploadImg(){ //TODO: remove
    const formData=new FormData();
    console.log(this.file.name);
    formData.append('file',this.file);
    this.http.post(`${API_URL}/file`, formData).subscribe(data=>console.log(data),err=>console.error(err));
  }

  createCard(){
    const formData=new FormData();
    formData.append('file',this.file);
    this.http.post(`${API_URL}/file`, formData).subscribe(data=>console.log(data),err=>console.error(err));

    this.newCard.img=`${API_URL}/${this.newCard.cardid}.png`;
    if(this.newCard.cardid < this.cartas.length)
      this.http.put<any>(`${API_URL}/c`, this.newCard).subscribe(_=>this.refreshCards());
    else
      this.http.post<any>(`${API_URL}/c`, this.newCard).subscribe(_=>this.refreshCards());
  }

  deleteCard(){
    this.http.delete<any>(`${API_URL}/c/${this.newCard.cardid}`).subscribe(_=>this.refreshCards());
  }

  setImg(){
    this.newCard.img=this.newImg;
    this.verify();
  }

  onImgChange(event){
    this.newImg=event.target.value;
  }

  onChange(thing,event){
    this.newCard[thing]=event.target.value;
    this.verify();
  }

  fileChanged(e){
    if(e.target.files.length>0){
      const file=e.target.files[0];
      const fail=file.slice(0,file.size,'image/*');
      this.file=new File([fail], this.newCard.cardid+".png",{type:'image/*'});
      this.reader.readAsDataURL(e.target.files[0]);
    }
  }

}
