import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, OnChanges, SimpleChanges, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class contactillos{
  static ay:Subject<boolean>=new Subject<boolean>();
  static obs=contactillos.ay.asObservable();

  static update(){
    contactillos.ay.next(false);
  }

}

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.less'],
  providers: [contactillos]
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
    contactillos.obs.subscribe(_=>{
      this.getContacts();
    });
  }

  getContacts(){
    if(!this.id)
      this.http.get<any>('http://localhost:3000/login?token='+localStorage.getItem("token")).subscribe(res=>
        this.http.get<any>('http://localhost:3000/u/contacts/'+(this.token=res.userid)).subscribe(data=>this.users=data)
      );
    else
      this.http.get<any>('http://localhost:3000/u/contacts/'+this.id).subscribe(data=>this.users=data);
  }
  
  update(){
    contactillos.update();
  }

}
