import { AfterContentInit, Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
  providers: [UserService]
})
export class RegisterComponent implements AfterContentInit{
  attributes = {
    name: { value: '', label: 'Name' },
    lastname: { value: '', label: 'Last_Name' },
    email: { value: '', label: 'Email', type: 'email' },
    username: { value: '', label: 'Username' },
    password: { value: '', label: 'Password', type: 'password' },
    password1: { value: '', label: 'Confirm password', type: 'password' },
  };
  matchingPassword = false;
  attributesKeys = Object.keys(this.attributes);
  isFull = false;
  regMsg;

  constructor(private http: HttpClient, private userService: UserService) { }

  ngAfterContentInit(): void {
    const { password, password1 } = this.attributes;
    this.matchingPassword = password.value === password1.value;
    this.isFull = this.verifyAllFilled();
  }

  createUser() {
    console.log("posting user...");

    const user = {
      name: this.attributes.name.value,
      lastName: this.attributes.lastname.value,
      username: this.attributes.username.value,
      email: this.attributes.email.value,
      password: this.attributes.password.value
    }
    this.http.post<any>('http://localhost:3000/u', user).subscribe(data => {
      console.log(data);
      this.regMsg={msg:"Usuario registrado exitosamente.",class:'text-success'};
    },error=>{
      this.regMsg={msg:"Usuario existente.",class:'text-danger'};
    })
  }

  onChange(property) {
    console.log(this.isFull);
    this.isFull = this.verifyAllFilled();
    if (['Password', 'Confirm password'].includes(property)) {
      this.verifyMatchingPasswords();
      console.log(this.matchingPassword);
    }
  }

  verifyAllFilled() {
    return Object.keys(this.attributes).every((key) => this.attributes[key].value.length > 4)
  }

  verifyMatchingPasswords() {
    const { password, password1 } = this.attributes;
    this.matchingPassword = password.value === password1.value;
  }

}
