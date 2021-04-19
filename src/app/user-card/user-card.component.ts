import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.less']
})
export class UserCardComponent implements OnInit {
  @Input() user;
  @Input() removable:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  hdrSize(b){
    if(!b) return window.location.href.includes("userlist")?'3em':'smaller';
    return window.location.href.includes("userlist")?'1.5em':'xx-small';
  }

}
