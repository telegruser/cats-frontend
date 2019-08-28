import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { CatInterface } from './models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // baseurl = "http://127.0.0.1:8000/api/cats/"; // test
  baseurl = "/api/cats/"


  constructor(private http: HttpClient, private appservice: AppService){}

  getAllCats(): Observable<any> {
    return this.appservice.accessRequestGet(this.baseurl);
  }

  getCat(id: number) {
    console.debug("GET запрос получение кота " + id.toString())
    return this.appservice.accessRequestGet(this.baseurl + id.toString() + "/")
  }

  editCat(cat: CatInterface) {
    console.debug("PATCH запрос редактирование кота")
    return this.appservice.accessRequestPatch(this.baseurl + cat.id.toString() + "/", cat)
    }

  createCat(cat: CatInterface) {
    console.debug("POST запрос на добавление кота: " + this.baseurl)
    return this.appservice.accessRequestPost(this.baseurl, cat);
  }

  removeCat(catId: number) {
    console.debug("Удаление кота: " + catId.toString());
    return this.appservice.accessRequestDelete(this.baseurl + catId.toString() + "/");
  }
}