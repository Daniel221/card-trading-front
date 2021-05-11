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
    this.container = document.getElementById("message-list");
    this.container.scrollTop = this.container.scrollHeight;
  }

}
