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
  attributes = {
    name: { value: '', label: 'Name' },
    lastname: { value: '', label: 'Last_Name' },
    username: { value: '', label: 'Username' },
    //password: { value: '', label: 'Password', type: 'password' },
    img:{value:'',label:'Image url'}
  };
  attributesKeys = Object.keys(this.attributes);
  regMsg;

  constructor(private actRoute:ActivatedRoute, private http:HttpClient) {
    this.actRoute.params.subscribe(p=>{
      const {id}=p;
      this.http.get<any>('http://localhost:3000/u/'+id).subscribe(data=>this.user=data);
    });
  }

  ngAfterContentInit(): void {
  }

  createUser() {
    const pass=prompt("Introduzca su contraseña actual para continuar.");
    if(pass!=this.user.password){
      console.log(pass,this.user.password);
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

}
