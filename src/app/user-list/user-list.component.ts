import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
  users:any[];

  constructor(private http:HttpClient, private _router: Router) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/u').subscribe(
      data=>this.users=data,
      err =>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this._router.navigate(['/login']);
          }
        }
      }
    );
  }

}
