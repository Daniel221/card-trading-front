import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const CARDS_API = 'http://localhost:3000/c';

@Component({
  selector: 'app-card-editing',
  templateUrl: './card-editing.component.html',
  styleUrls: ['./card-editing.component.less']
})


export class CardEditingComponent implements OnInit {
  cards: any[];
  currentCard: any;
  title: string;
  description: string;
  img: string;
  type;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCards();
    this.defaultCard();
  }

  showCards() {
    console.log(this.cards);
  }

  updateCard($event) {
    this.currentCard = $event;
    this.title = this.currentCard.title;
    this.description = this.currentCard.description;
    this.img = this.currentCard.img;
    this.type = this.currentCard.type;
  }

  updateCardApi() {
    this.http.put<any>(`${CARDS_API}`, {
      id: this.currentCard.id,
      title: this.title,
      description: this.description,
      img: this.img,
      type: this.type
    }).subscribe(res => {
      const { ok, error } = res;
      if (ok) alert(ok);
      else alert(error);
      this.getCards();
    });
  }

  getCards() {
    this.http.get<any>(`${CARDS_API}/all`).subscribe(data => {
      this.cards = data;
    });
  }

  addCardApi() {
    this.http.post<any>(`${CARDS_API}`, {
      title: this.title,
      description: this.description,
      img: this.img,
      type: this.type
    }).subscribe(res => {
      const { ok, error } = res;
      if (ok) alert(ok);
      else alert(error);
      this.getCards();
    });
  }

  defaultCard() {
    this.title = 'something';
    this.description = 'a card';
    this.img = 'none',
      this.type = 0;
  }
}
