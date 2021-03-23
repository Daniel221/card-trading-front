import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  status = "no se ha enviado";
  exampleEmail = "example@...";
  displayLoginForm = false;
  constructor() { }

  ngOnInit(): void {
  }
  onLoginForm(){
    this.displayLoginForm = true;
  }
  onSubmit(email){
    console.log(email);
    this.status = "se ha enviado";
  }
}
