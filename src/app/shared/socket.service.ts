import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client'

const SOCKET_ENDPOINT = 'ws://localhost:3000';

@Injectable()
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(SOCKET_ENDPOINT);
  }

  login(name, room) {
    this.socket.emit('login', { name, room });
  }

  sendMessage(message, receiver, sender) {
    this.socket.emit('send_message', { content: message, senderChatID: sender, receiverChatID: receiver });
  }

  getMessage() {
    return new Observable<string>(observer => {
      this.socket.on('message', message => {
        observer.next(message.content);
      })
    })
  }
  getPrivateMessage() {
    return new Observable<string>(observer => {
      this.socket.on('privateMessage', message => {
        observer.next(message);
      })
    })
  }

  getGeneralMessage() {
    return new Observable<string>(observer => {
      this.socket.on('generalMessage', message => {
        observer.next(message);
      })
    })
  }

}