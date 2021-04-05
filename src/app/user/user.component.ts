import { HttpClient } from '@angular/common/http';
import { Component, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements AfterContentInit {
  user;
  password='';
  attributes = {
    name: { value: '', label: 'Name' },
    lastname: { value: '', label: 'Last_Name' },
    username: { value: '', label: 'Username' },
    img:{value:'',label:'Image url'}
  };
  attributesKeys = Object.keys(this.attributes);
  regMsg;
  userCards;

  constructor(private actRoute:ActivatedRoute, private http:HttpClient) {
    this.actRoute.params.subscribe(p=>{
      const {id}=p;
      this.http.get<any>('http://localhost:3000/u/'+id).subscribe(data=>this.user=data);
      this.http.get<any>(`http://localhost:3000/c?user=${id}`).subscribe(data=>this.userCards=data);
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
      img:this.attributes.img.value
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

}
