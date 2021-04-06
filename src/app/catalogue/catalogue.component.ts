import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.less']
})
export class CatalogueComponent implements OnInit {
  cards;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/c').subscribe(data=>{
      this.cards=data;
    });
  }

  nnn = 6;
  genCols(i) {
    let s = '';
    for (let c = 0; c < i; c++)s += `${2 * (i + 0.5)}em `;
    return s;
  }

  genRows() {
    let i = this.cards.length / 4, rows = '', f = -2.0 / 19.0 * this.cards.length + 6.0;
    for (let c = 0; c < i; c++) rows += `${f * (i + 0.5)}em `;
    return rows;
  }

}
