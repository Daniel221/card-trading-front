import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
  users:any[];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/u').subscribe(data=>this.users=data);
  }

}
