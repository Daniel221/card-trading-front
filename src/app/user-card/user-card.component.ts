import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.less']
})
export class UserCardComponent implements OnInit {
  @Input() user;
  @Input() removable: number = -1;
  @Input() extra;
  @Input() chat: boolean;
  @Output() rer = new EventEmitter<any>();
  @Output() changeChatUser = new EventEmitter<any>();
  deleteAlert: boolean = false;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  hdrSize(b) {
    if (!b) return window.location.href.includes("userlist") ? '3em' : 'smaller';
    return window.location.href.includes("userlist") ? '1.5em' : 'xx-small';
  }

  remove() {
    this.http.delete<any>('https://card-trading-api-dev.herokuapp.com/u/contacts?oid=' + this.removable + '&id=' + this.extra).subscribe(data => {
      this.rer.emit();
    });
  }

  activateDeleteAlert() {
    this.deleteAlert = true;

  }

  deactivateDeleteAlert() {
    this.deleteAlert = false;
  }

  contactClick() {
    this.changeChatUser.emit({
      username: this.user.username,
      userid: this.user.userid
    })
  }
}
