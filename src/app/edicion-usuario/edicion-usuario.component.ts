import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../shared/auth.service';

declare var $: any;

@Component({
  selector: 'app-edicion-usuario',
  templateUrl: './edicion-usuario.component.html',
  styleUrls: ['./edicion-usuario.component.less']
})
export class EdicionUsuarioComponent implements OnInit {
  @Input() user: any;
  profileText;
  attributes = {
    name: { value: '', label: 'Name' },
    lastname: { value: '', label: 'Last_Name' },
    birthday: { value: '', label: 'Birthday' },
  };

  attributesKeys = ['name', 'lastname', 'birthday'];

  constructor(private http: HttpClient, private auth: AuthService) { }
  ngOnInit(): void { }

  toggleDel(){
      this.http.delete('https://card-trading-api-dev.herokuapp.com/u/'+this.user.userid).subscribe(data=>{
        $("#confirmModal").modal("hide");
        this.auth.logoutUser();
      }, error => {
        //this.regMsg = { msg: "Error, intente de nuevo más tarde.", class: 'text-danger' };
      });
      return;
    }
}
