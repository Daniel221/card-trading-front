import { AfterContentInit, Component } from '@angular/core';
import { UserService } from './shared/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers:[UserService]
})
export class AppComponent implements AfterContentInit {
  title = 'adopt-me-front';
  kks=["name","lastname","password","password1","color"];
  attributes = {
    name: { value: 'Erick', label: 'Name' },
    lastname: { value: 'De Santiago', label: 'Last Name' },
    username: { value: 'kireck', label: 'Username' },
    password: { value: '1234', label: 'Password', type: 'password' },
    password1: { value: '1234', label: 'Confirm password', type: 'password' },
    color: { value: 'green', label: 'Favorite Color' }
  }
  attributesKeys = Object.keys(this.attributes);
  isFull=false;
  users=[];
  
  cards=[
    {id:0,title:'Calabaza',description:'Una calabaza naranja.',img:'https://s03.s3c.es/imag/_v0/770x420/a/b/3/600x400_calabaza-770.jpg',type:0},
    {id:1,title:'Zapatos de payaso',description:'Unos zapatos con los que podrás decir cualquier cosa sin que te tomen en serio.',img:'https://http2.mlstatic.com/D_NQ_NP_819765-MLM32344851522_092019-O.jpg',type:3},
    {id:2,title:'Bosque de eucaliptos',description:'Un gran bosque que te hará perderte.',img:'https://image.freepik.com/foto-gratis/bosque-eucaliptos-galicia-espana_79295-16167.jpg',type:1},
    {id:3,title:'Pistola',description:'Dispara.',img:'https://cdn.britannica.com/s:690x388,c:crop/73/130773-050-080A8034/Browning-Hi-Power-pistol.jpg',type:2},
    {id:0,title:'Calabaza',description:'Una calabaza naranja.',img:'https://s03.s3c.es/imag/_v0/770x420/a/b/3/600x400_calabaza-770.jpg',type:0},
    {id:0,title:'Calabaza',description:'Una calabaza naranja.',img:'https://s03.s3c.es/imag/_v0/770x420/a/b/3/600x400_calabaza-770.jpg',type:0},
    {id:0,title:'Calabaza',description:'Una calabaza naranja.',img:'https://s03.s3c.es/imag/_v0/770x420/a/b/3/600x400_calabaza-770.jpg',type:0},
    {id:2,title:'Bosque de eucaliptos',description:'Un gran bosque que te hará perderte.',img:'https://image.freepik.com/foto-gratis/bosque-eucaliptos-galicia-espana_79295-16167.jpg',type:1},
    {id:0,title:'Calabaza',description:'Una calabaza naranja.',img:'https://s03.s3c.es/imag/_v0/770x420/a/b/3/600x400_calabaza-770.jpg',type:0},
    {id:1,title:'Zapatos de payaso',description:'Unos zapatos con los que podrás decir cualquier cosa sin que te tomen en serio.',img:'https://http2.mlstatic.com/D_NQ_NP_819765-MLM32344851522_092019-O.jpg',type:3},
    {id:0,title:'Calabaza',description:'Una calabaza naranja.',img:'https://s03.s3c.es/imag/_v0/770x420/a/b/3/600x400_calabaza-770.jpg',type:0},
    {id:2,title:'Bosque de eucaliptos',description:'Un gran bosque que te hará perderte.',img:'https://image.freepik.com/foto-gratis/bosque-eucaliptos-galicia-espana_79295-16167.jpg',type:1},
    {id:0,title:'Calabaza',description:'Una calabaza naranja.',img:'https://s03.s3c.es/imag/_v0/770x420/a/b/3/600x400_calabaza-770.jpg',type:0},
    {id:1,title:'Zapatos de payaso',description:'Unos zapatos con los que podrás decir cualquier cosa sin que te tomen en serio.',img:'https://http2.mlstatic.com/D_NQ_NP_819765-MLM32344851522_092019-O.jpg',type:3},
    {id:0,title:'Calabaza',description:'Una calabaza naranja.',img:'https://s03.s3c.es/imag/_v0/770x420/a/b/3/600x400_calabaza-770.jpg',type:0},
    {id:3,title:'Pistola',description:'Dispara.',img:'https://cdn.britannica.com/s:690x388,c:crop/73/130773-050-080A8034/Browning-Hi-Power-pistol.jpg',type:2},
    {id:0,title:'Calabaza',description:'Una calabaza naranja.',img:'https://s03.s3c.es/imag/_v0/770x420/a/b/3/600x400_calabaza-770.jpg',type:0},
    {id:2,title:'Bosque de eucaliptos',description:'Un gran bosque que te hará perderte.',img:'https://image.freepik.com/foto-gratis/bosque-eucaliptos-galicia-espana_79295-16167.jpg',type:1},
    {id:0,title:'Calabaza',description:'Una calabaza naranja.',img:'https://s03.s3c.es/imag/_v0/770x420/a/b/3/600x400_calabaza-770.jpg',type:0},
    {id:3,title:'Pistola',description:'Dispara.',img:'https://cdn.britannica.com/s:690x388,c:crop/73/130773-050-080A8034/Browning-Hi-Power-pistol.jpg',type:2},
    {id:1,title:'Zapatos de payaso',description:'Unos zapatos con los que podrás decir cualquier cosa sin que te tomen en serio.',img:'https://http2.mlstatic.com/D_NQ_NP_819765-MLM32344851522_092019-O.jpg',type:3},
    {id:3,title:'Pistola',description:'Dispara.',img:'https://cdn.britannica.com/s:690x388,c:crop/73/130773-050-080A8034/Browning-Hi-Power-pistol.jpg',type:2},
    {id:0,title:'Calabaza',description:'Una calabaza naranja.',img:'https://s03.s3c.es/imag/_v0/770x420/a/b/3/600x400_calabaza-770.jpg',type:0},
    {id:2,title:'Bosque de eucaliptos',description:'Un gran bosque que te hará perderte.',img:'https://image.freepik.com/foto-gratis/bosque-eucaliptos-galicia-espana_79295-16167.jpg',type:1},
    {id:0,title:'Calabaza',description:'Una calabaza naranja.',img:'https://s03.s3c.es/imag/_v0/770x420/a/b/3/600x400_calabaza-770.jpg',type:0},
    {id:1,title:'Zapatos de payaso',description:'Unos zapatos con los que podrás decir cualquier cosa sin que te tomen en serio.',img:'https://http2.mlstatic.com/D_NQ_NP_819765-MLM32344851522_092019-O.jpg',type:3},
    {id:0,title:'Calabaza',description:'Una calabaza naranja.',img:'https://s03.s3c.es/imag/_v0/770x420/a/b/3/600x400_calabaza-770.jpg',type:0},
    {id:2,title:'Bosque de eucaliptos',description:'Un gran bosque que te hará perderte.',img:'https://image.freepik.com/foto-gratis/bosque-eucaliptos-galicia-espana_79295-16167.jpg',type:1},
    {id:0,title:'Calabaza',description:'Una calabaza naranja.',img:'https://s03.s3c.es/imag/_v0/770x420/a/b/3/600x400_calabaza-770.jpg',type:0},
    {id:3,title:'Pistola',description:'Dispara.',img:'https://cdn.britannica.com/s:690x388,c:crop/73/130773-050-080A8034/Browning-Hi-Power-pistol.jpg',type:2},
    {id:0,title:'Calabaza',description:'Una calabaza naranja.',img:'https://s03.s3c.es/imag/_v0/770x420/a/b/3/600x400_calabaza-770.jpg',type:0},
    {id:2,title:'Bosque de eucaliptos',description:'Un gran bosque que te hará perderte.',img:'https://image.freepik.com/foto-gratis/bosque-eucaliptos-galicia-espana_79295-16167.jpg',type:1},
    {id:0,title:'Calabaza',description:'Una calabaza naranja.',img:'https://s03.s3c.es/imag/_v0/770x420/a/b/3/600x400_calabaza-770.jpg',type:0},
    {id:2,title:'Bosque de eucaliptos',description:'Un gran bosque que te hará perderte.',img:'https://image.freepik.com/foto-gratis/bosque-eucaliptos-galicia-espana_79295-16167.jpg',type:1},
    {id:3,title:'Pistola',description:'Dispara.',img:'https://cdn.britannica.com/s:690x388,c:crop/73/130773-050-080A8034/Browning-Hi-Power-pistol.jpg',type:2},
    {id:1,title:'Zapatos de payaso',description:'Unos zapatos con los que podrás decir cualquier cosa sin que te tomen en serio.',img:'https://http2.mlstatic.com/D_NQ_NP_819765-MLM32344851522_092019-O.jpg',type:3}
  ];
  
  constructor(private userService:UserService){

  }

  ngAfterContentInit(): void {
    const { password, password1 } = this.attributes;
    this.isFull = this.verifyAllFilled();
  }

  onChange(prop:string,e:Event){
    this.isFull=this.verifyAllFilled();
    this[prop]=(<HTMLInputElement>e.target).value;
  }

  verifyAllFilled() {
    return Object.keys(this.attributes).every((key) => this.attributes[key].value.length > 0)
  }

  onSub(){
    const {name: { value: name },lastname: { value: lastname },username: { value: username },password: { value: password },password1: { value: password1 },color: { value: color }}=this.attributes;
    this.users.push({name: { value: name },lastname: { value: lastname },username: { value: username },password: { value: password },password1: { value: password1 },color: { value: color }});
  }

  nnn=6;
  genCols(i){
    let s='';
    for(let c=0;c<i;c++)s+=`${2*(i+0.5)}em `;
    return s;
  }

  genRows(){
    let i=this.cards.length/4,rows='',f=-2.0/19.0*this.cards.length+6.0;
    for(let c=0;c<i;c++) rows+=`${f*(i+0.5)}em `;
    return rows;
  }
}
