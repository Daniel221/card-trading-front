import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.less']
})
export class ContactListComponent implements OnInit,OnChanges {
  users:any[];
  @Input() id:number=undefined;
  token;

  constructor(private http:HttpClient) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getContacts();
  }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(){
    if(!this.id){
      this.http.get<any>('http://localhost:3000/login?token='+localStorage.getItem("token")).subscribe(res=>{
        this.http.get<any>('http://localhost:3000/u/contacts/'+res.userid).subscribe(data=>{
          this.users=data
          this.token=res.userid;
        });
      });
    }else{
      this.http.get<any>('http://localhost:3000/u/contacts/'+this.id).subscribe(data=>this.users=data);
    }
  }

}
