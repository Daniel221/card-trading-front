import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less']
})
export class MessageComponent implements OnInit, AfterViewInit {
  @Input() message: string;
  @Input() date: string;
  container: HTMLElement;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let chatBox=document.querySelector(".chat-messages-show-container");
    chatBox.scrollTo(0, chatBox.scrollHeight);
  }

}
