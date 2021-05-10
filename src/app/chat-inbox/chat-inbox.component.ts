import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, ViewChild, OnChanges, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SocketService } from '../shared/socket.service';
import * as moment from 'moment';

const SOCKET_ENDPOINT = 'localhost:3000';
const CHAT_API = 'http://localhost:3000/chat';



@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.less']
})
export class ChatInboxComponent implements OnInit, OnDestroy, OnChanges {
  @Input() addressee: any;
  @Input() userid: any;
  currentRoom: string;
  message: string;
  isLoggedIn: boolean = false;
  socketSubscription: Subscription;
  messages: any[] = ["hello everyone! test message here"];
  container: HTMLElement;

  constructor(private socketService: SocketService, private http: HttpClient,) { }

  ngOnChanges(): void {
    if (this.addressee) {
      this.messages.length = 0;
      this.getStoredMessages();
      if (this.currentRoom) {
        this.socketService.logout(this.currentRoom);
      }
      this.currentRoom = `${this.userid}_${this.addressee.id}`;
      this.socketService.login('idk', this.currentRoom);
    }
  }

  ngOnInit(): void {
    this.socketSubscription = this.socketService.getMessage().subscribe(data => {
      this.messages.push(data)
    });
  }

  ngOnDestroy(): void {
    this.socketSubscription.unsubscribe();
  }

  SendMessage() {
    if (this.message) {
      let date = moment().format('MMMM Do YYYY, h:mm:ss a');
      this.socketService.sendMessage(this.message, this.addressee.id, this.userid, date);
      this.messages.push({
        msg: this.message,
        senderid: this.userid,
        senddate: date
      });
      this.http.post<any>(`${CHAT_API}`, {
        msg: this.message,
        addresseeid: this.addressee.id,
        userid: this.userid,
        date
      }).subscribe();
      this.message = '';
      this.container = document.getElementById("msg-box");//needs fix, probably making another component
      this.container.scrollTop = this.container.scrollHeight;
    }
  }

  getStoredMessages() {
    this.http.get<any>(`${CHAT_API}?addresseeid=${this.addressee.id}&userid=${this.userid}`).subscribe(res => {
      res.map(element => {
        this.messages.push(element);
      });
    });
  }
}
