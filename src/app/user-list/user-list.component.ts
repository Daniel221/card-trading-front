import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  usuarios: any[] = [];
  usersInPage: any[] = [];
  currPage: number = 0;
  usersPerPage: number = 24;
  filter: string = '';

  constructor(private http: HttpClient, private _router: Router) { }

  ngOnInit(): void {
    this.http.get<any>('https://card-trading-api-dev.herokuapp.com/u').subscribe(data => {
      this.users = data;
      this.usuarios = data;
      this.usersInPage = this.usuarios.slice(0, this.usersPerPage);
    },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(['/login']);
          }
        }
      });
  }

  updateFilter(e) {
    this.filter = e.target.value;
    if (this.filter.length <= 0) {
      this.users = this.usuarios;
      this.currPage = 0;
      this.updatePageUsers();
    }
  }

  applyFilter() {
    if (this.filter.length > 0)
      this.users = this.usuarios.filter(user => user.username?.toLowerCase().includes(this.filter.toLowerCase()));
    else this.users = this.usuarios;
    this.currPage = 0;
    this.updatePageUsers();
  }

  updatePageUsers() {
    this.usersInPage = this.users.slice(this.currPage * this.usersPerPage, (this.currPage + 1) * this.usersPerPage);
  }

  nextPage(s) {
    this.currPage += s;
    this.updatePageUsers();
  }

  prevPage(s) {
    this.currPage -= s;
    this.updatePageUsers();
  }

}
