import { HttpClient } from '@angular/common/http';
import { Component, AfterContentInit, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements AfterContentInit {
  user;
  userid;
  myid;
  password='';
  attributes = {
    name: { value: '', label: 'Name' },
    lastname: { value: '', label: 'Last_Name' },
    username: { value: '', label: 'Username' },
    img:{value:'',label:'Image url'},
    profiletext:{value:'',label:'Description'}
  };
  attributesKeys = Object.keys(this.attributes);
  regMsg;
  userCards;
  @ViewChild('contactos') contactos;

  constructor(private actRoute:ActivatedRoute, private http:HttpClient) {
    this.actRoute.params.subscribe(p=>{
      this.userid=p.id;
      this.http.get<any>('http://localhost:3000/u/'+this.userid).subscribe(data=>this.user=data);
      this.http.get<any>(`http://localhost:3000/c?user=${this.userid}`).subscribe(data=>this.userCards=data);
      this.http.get<any>('http://localhost:3000/login?token='+localStorage.getItem("token")).subscribe(res=>{
        this.myid=res.userid;
      });
    });
  }

  ngAfterContentInit(): void {
  }

  createUser() {
    if(this.password!=this.user.password){
      this.regMsg={msg:"Contraseña incorrecta.",class:'text-danger'};
      return;
    }
    console.log("updating user...");

    const user = {
      name: this.attributes.name.value,
      lastName: this.attributes.lastname.value,
      username: this.attributes.username.value,
      img:this.attributes.img.value,
      profiletext:this.attributes.profiletext.value
    }
    this.http.put<any>('http://localhost:3000/u/'+this.user.userid, user).subscribe(data => {
      console.log(data);
      this.regMsg={msg:"Usuario actualizado exitosamente.",class:'text-success'};
      window.location.reload();
    },error=>{
      console.log(error);
      this.regMsg={msg:"Error.",class:'text-danger'};
    })
  }

  onChanged(e){
    this.password=e.target.value;
  }

  nnn = 6;
  genCols(i) {
    let s = '';
    for (let c = 0; c < i; c++)s += `${2 * (i + 0.5)}em `;
    return s;
  }

  addFrend(){
    this.http.post<any>('http://localhost:3000/u/contacts/'+this.userid,{id:this.myid}).subscribe(data=>{
      this.contactos.update();
      alert("Contacto añadido");
    },err=>{
      alert(err.error.error);
    });
  }

}
