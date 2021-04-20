import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketService } from '../shared/socket.service';

const SOCKET_ENDPOINT = 'localhost:3000';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.less']
})
export class ChatInboxComponent implements OnInit, OnDestroy {
  @Input() showChat = true;
  @Output() showChatChange = new EventEmitter<boolean>()
  message: string;
  username: string;
  receiver: string;
  isLoggedIn: boolean = false;
  subscription: Subscription;
  messages: string[] = ["mensajes para todos"];

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.subscription = this.socketService.getMessage().subscribe(data => {
      this.messages.push(data)
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  SendMessage() {
    this.socketService.sendMessage(this.message, this.receiver, this.username);
    const element = document.createElement('li');
    element.innerHTML = this.message;
    element.style.background = 'white';
    element.style.padding = '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    document.getElementById('message-list').appendChild(element);
    this.message = '';
  }

  setupSocketConnection() {
    document.getElementById('conn-msg').innerHTML = 'conected';
    this.socketService.login('Pedro', this.username);
    // this.socket.on('receive_message', (data) => {
    //   if (data.content) {
    //     const element = document.createElement('li');
    //     element.innerHTML = data.content;
    //     element.style.background = 'white';
    //     element.style.padding = '15px 30px';
    //     element.style.margin = '10px';
    //     document.getElementById('message-list').appendChild(element);
    //   }
    // });
  }

  closeChat() {
    this.showChatChange.emit(false);
  }
}
