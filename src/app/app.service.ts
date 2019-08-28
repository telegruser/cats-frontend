import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, BehaviorSubject } from 'rxjs';
import { TokenData } from './models';

 
@Injectable({ providedIn: 'root' })
export class AppService {

  private getTokenUrl = '/auth/token/';
  private refreshTokenUrl = '/auth/token/';
  private revokeTokenUrl = '/auth/token/revoke/';
  private registrationUrl = '/auth/register/';

  constructor(private router: Router, private http: HttpClient, private cookie: CookieService) { }

  private get token(): TokenData { 
    return {
      accessToken: this.cookie.get('access_token'),
      refreshToken: this.cookie.get('refresh_token'),
      endDatetime: new Date(this.cookie.get('end_datetime'))
    }
  }

  public get username() { return this.cookie.get('username'); }

  private setToken(accessToken: string, refreshToken: string, expiresIn: number, username?: string) {
    let endDatetime = new Date();
    endDatetime.setSeconds(endDatetime.getSeconds() + expiresIn)
    this.cookie.set('access_token', accessToken)
    this.cookie.set('refresh_token', refreshToken)
    this.cookie.set('end_datetime', endDatetime.toString())
    if (username) this.cookie.set('username', username)
  }

  // private removeToken() { 
  //   // localStorage.removeItem('access_token');
  //   // localStorage.removeItem('username');
  //   this.cookie.delete('access_token')
  //   this.cookie.delete('refresh_token')
  //   this.cookie.delete('end_datetime')
  //   this.cookie.delete('username')
  // }

  public get isAuthorized() { 
    console.debug('наличие токена: ' + String((this.token.accessToken != null)))    
    console.debug('валидность токена: ' + String(new Date() < this.token.endDatetime))
    return ((this.token.accessToken != null) && (new Date() < this.token.endDatetime))
  }

  private validToken(): TokenData {
    let t = this.token    
    if (new Date() > t.endDatetime) {
      return this.refreshToken()
    }
    return t
  }

  private makeHttpHeaders(): HttpHeaders {
    console.info('сборка заголовков запроса')
    var csrftoken = this.cookie.get('csrftoken');

    var accessToken = this.validToken().accessToken
    
    return new HttpHeaders({
      "Content-type": "application/json",
      'Authorization': 'Bearer '+ accessToken,
      "X-CSRFToken": csrftoken,
    });
  }

  accessRequestGet(resourceUrl: string): Observable<any> {
    return this.http.get(resourceUrl, {headers: this.makeHttpHeaders()})
  }

  accessRequestDelete(resourceUrl: string) {
    return this.http.delete(resourceUrl, {headers: this.makeHttpHeaders()});
  }

  accessRequestPost(resourceUrl: string, body: any) {
    return this.http.post(resourceUrl, body, {headers: this.makeHttpHeaders()});
  }

  accessRequestPatch(resourceUrl: string, body: any) {
    return this.http.patch(resourceUrl, body, {headers: this.makeHttpHeaders()})
  }

  logIn(username: string, password: string) {
    console.debug('запрос токена');
    let res = false;
    // this.http.post(this.getTokenUrl, {username: username, password: password}, {headers: new HttpHeaders({"Content-type": "application/json"})}).subscribe(
      this.http.post(this.getTokenUrl, {username: username, password: password}).subscribe(
      data => {
        console.debug('токен получен');
        var tokenData: any = data;        
        this.setToken(tokenData.access_token, tokenData.refresh_token, tokenData.expires_in, username)
        res = true;
        this.router.navigate(['/']);
      },
        err => {
          alert('Неправильный пароль');
          console.debug(err);
        });
        return res;

    // var body = `grant_type=password&client_id=${this.clientId}&client_secret=${this.clientSecret}&username=${username}&password=${password}`;
    // let headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded'});
    // this.http.post(this.getTokenUrl, body, {headers: headers}).subscribe(
    //     data => {
    //       console.debug('токен получен');
    //       var token_data: any = data;
    //       this.setUser(username, token_data.access_token)
    //       res = true;
    //       this.router.navigate(['/']);
    //     },
    //     err => {
    //       alert('Неправильный пароль');
    //       console.debug(err);
    //     });
    //     return res;
  }

  refreshToken(): TokenData {
    // console.debug('Отзыв токена')
    this.http.post(this.refreshTokenUrl, {refresh_token: this.token.refreshToken}).subscribe(  //, {headers: new HttpHeaders({})})
      data => {
        console.debug('refresh token');
        var tokenData: any = data;        
        this.setToken(tokenData.access_token, tokenData.refresh_token, tokenData.expires_in);
      },
      err => console.error(err)
    )
    return this.token
  }
 
  logout() {
    console.debug('Отзыв токена')
    let accessToken = this.token.accessToken
    this.cookie.delete('access_token')
    this.cookie.delete('refresh_token')
    this.cookie.delete('end_datetime')
    this.cookie.delete('username')
    this.http.post(this.revokeTokenUrl, {token: accessToken}).subscribe(  //, {headers: new HttpHeaders({})})
      data => {
        console.debug('Токен отозван')
      },
      err => console.error(err)
    )    
    this.router.navigate(['/login']);
  }

  register(username: string, password: string) {
    this.http.post(this.registrationUrl, {
      username: username,
      password: password,
    }).subscribe(
      data => this.logIn(username, password),
      err => console.debug(err)
    )
  }

}