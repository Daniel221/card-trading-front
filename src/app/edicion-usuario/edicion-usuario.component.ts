import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../shared/auth.service';

declare var $: any;

@Component({
  selector: 'app-edicion-usuario',
  templateUrl: './edicion-usuario.component.html',
  styleUrls: ['./edicion-usuario.component.less']
})
export class EdicionUsuarioComponent implements OnInit {
  @Input() userid: any;
  regMsg;
  @Input() name = "";
  @Input() lastname = "";
  @Input() birthday = "";
  @Input() img = "";
  @Input() profileText = "";
  @Input() username = "";


  constructor(private http: HttpClient, private auth: AuthService) { }
  ngOnInit(): void {
  }

  toggleDel() {
    this.http.delete('https://card-trading-api-dev.herokuapp.com/u/' + this.userid).subscribe(data => {
      $("#confirmModal").modal("hide");
      this.auth.logoutUser();
    }, error => {
      //this.regMsg = { msg: "Error, intente de nuevo más tarde.", class: 'text-danger' };
    });
    return;
  }

  createUser() {
    console.log("updating user...");

    const user = {
      name: this.name,
      lastName: this.lastname,
      username: this.username,
      img: this.img,
      profiletext: this.profileText,
      birthday: this.birthday
    }//
    //
    this.http.put<any>('https://card-trading-api-dev.herokuapp.com/u/' + this.userid, user).subscribe(data => {
      this.regMsg = { msg: "Usuario actualizado exitosamente.", class: 'text-success' };
      // Object.keys(user).forEach(k => {
      //   if (user[k] != undefined && user[k].length > 0)
      //     this.user[k] = user[k];
      // });
      $("#confirmModal").modal("hide");
    }, error => {
      this.regMsg = { msg: "Error, intente de nuevo más tarde.", class: 'text-danger' };
    })


  }
}
