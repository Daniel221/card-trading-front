import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html',
  styleUrls: ['./chat-app.component.less']
})
export class ChatAppComponent implements OnInit {
  @Input() userid: any;
  addressee: any;


  constructor() { }

  ngOnInit(): void {
  }

  addresseeChange($event) {
    this.addressee = {
      id: $event.userid,
      name: $event.username
    }
  }

}
