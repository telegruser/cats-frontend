import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'home-header',
  providers: [AppService],
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
})

export class HomeComponent {
  constructor(
      private service:AppService){}

  ngOnInit(){
      
  }

  logout() {
      this.service.logout();
  }
}