import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.less']
})
export class UserCardComponent implements OnInit {
  @Input() user;

  constructor() { }

  ngOnInit(): void {
  }

}
