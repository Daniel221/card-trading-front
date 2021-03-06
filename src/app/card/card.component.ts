import { Component, Input, OnInit } from '@angular/core';
const colors=[[148,129,61],[83,137,71],[102,73,42],[149,77,77],[179,131,162],[71,137,101]];

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent {
  @Input() id:number;
  @Input() title:string;
  @Input() description:string;
  @Input() img:string;
  @Input() type:number;

  constructor() { }

  fromType(t){
    return `url('./${t}.png')`;
  }
  rgbaType(t){
    return `rgba(${colors[t][0]},${colors[t][1]},${colors[t][2]}, 0.75)`;
  }

  hover(e){
    console.log(e)
  }

}
