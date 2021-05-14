import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

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

  constructor() { }
  ngOnInit(): void {
    this.user.birthday = '23/03/2000';
    console.log(this.user);
  }
}
