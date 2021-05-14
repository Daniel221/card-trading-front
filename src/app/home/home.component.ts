import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if(!localStorage.getItem("token") && $("#lasChecas").length) location.reload();
  }

}
