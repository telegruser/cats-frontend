import { Component } from '@angular/core';
import { CookieJar, cookieCompare } from 'tough-cookie';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  constructor(private cookie: CookieService, private appservice: AppService){}
}
