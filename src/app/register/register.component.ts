import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username = "";
  password1 = "";
  password2 = "";
  registerAlert = false;
  alertText = null;

  constructor(private appservice: AppService) { }

  register() {
    if (this.password1 != this.password2) {
      this.registerAlert = true;
      this.alertText = 'Пароли не совпадают!'
      return
    }
    this.registerAlert = true;
    this.alertText = 'Регистрация..' 
    this.appservice.register(this.username, this.password1);
  }

  ngOnInit() {
  }

}
