import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
    constructor(public service: AppService) {}

    username = "user";
    password = '11235813a';
    // loginWithPassword: any;
    // loginFailed: any;
    // realUsername: string;

    login() { 
        console.debug('кнопка запроса токена нажата');
        // this.service.obtainAccessToken(this.username, this.password);
        this.service.logIn(this.username, this.password);
    }

    logout() { 
        this.service.logout();
    }

    ngOnInit() {}

}