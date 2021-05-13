import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client'

const SOCKET_ENDPOINT = 'wss://https://card-trading-api-dev.herokuapp.com';

@Injectable()
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(SOCKET_ENDPOINT);
  }

  logout(room) {
    this.socket.emit('logout', room);
  }

  login(name, room) {
    this.socket.emit('login', { name, room });
  }

  sendMessage(message, receiver, sender, date) {
    this.socket.emit('send_message', { msg: message, addresseeid: receiver, userid: sender, date });
  }

  getMessage() {
    return new Observable<string>(observer => {
      this.socket.on('message', message => {
        observer.next(message);
      })
    })
  }

}