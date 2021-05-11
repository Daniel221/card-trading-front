import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.less']
})
export class CatalogueComponent implements OnInit {
  cards;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('https://card-trading-api-dev.herokuapp.com/c').subscribe(data => {
      this.cards = data;
    });
  }

}
