import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { io } from 'socket.io-client';

const SOCKET_ENDPOINT = 'localhost:3000';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.less']
})
export class ChatInboxComponent implements OnInit {
  @Input() showChat = true;
  @Output() showChatChange = new EventEmitter<boolean>()
  socket;
  message: string;
  username: string;
  receiver: string;
  constructor() { }

  ngOnInit(): void {
    //this.setupSocketConnection();
  }

  SendMessage() {
    this.socket.emit('send_message', {
      content: this.message,
      senderChatID: this.username,
      receiverChatID: this.receiver
    });
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
    this.socket = io({
      query: {
        username: this.username,
      }
    });//when building to production, leave the parenthesis in blank, delete SOCKET_ENDPOINT var
    this.socket.on('receive_message', (data) => {
      if (data.content) {
        const element = document.createElement('li');
        element.innerHTML = data.content;
        element.style.background = 'white';
        element.style.padding = '15px 30px';
        element.style.margin = '10px';
        document.getElementById('message-list').appendChild(element);
      }
    });
  }

  closeChat() {
    this.showChatChange.emit(false);
  }
}
