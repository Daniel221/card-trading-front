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
    this.attributes.name.value = this.user.name;
    this.attributes.lastname.value = this.user.lastname;
    this.attributes.birthday.value = this.user.birthday;
    this.user.img = this.user.img ? this.user.img : 'https://i1.sndcdn.com/avatars-000310902564-g2unlt-t240x240.jpg';
  }
}
