import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username = ""

  constructor(public appservice: AppService) { 
    this.username = appservice.username
   }

  logOut(){
    this.appservice.logout();
  }

  ngOnInit() {
  }

}
