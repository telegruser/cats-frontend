import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { NgModel} from '@angular/forms';
import { Cat } from '../models';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css'],
  providers: [ApiService]
})

export class CatComponent implements OnInit {
  
  cats : Cat[];
  editedCat: boolean[];
  newCatBirthday: Date;
  newCatSex: string;

  catEdited(catId: number) {
    this.editedCat[catId] = true;
  }

  sexToString(sexChar: string) {
    var answer = "?";
    if (sexChar == "m") {answer = "кот"}
    else if (sexChar == "w") {answer = "кошка"}
    return answer;
  }

  birthdayToDate(birthday: string) {
    // var d = birthday.split('-');
    // var year = Number(d[0]);
    // var month = Number(d[1]);
    // var day = Number(d[2]);
    return new Date(birthday);
  }

  birthdayToStr(birthday: string) {
    // var answer = "не определено";
    var date = this.birthdayToDate(birthday);
    return new DatePipe("en-EN").transform(date, "dd.MM.yyyy")
  }

  constructor(private api: ApiService, private activateRoute: ActivatedRoute, private router: Router) {
    activateRoute.params.subscribe(params=>this.id=Number(params['id']));
    // console.error(this.id);
    this.loadCat();
    this.isChanged = false;
    // this.loadAllCats();
  }

  isChanged = false;
  id: number;
  cat?: Cat = null;

  toChange() {
    this.isChanged = true;
  }

  loadCat() {
    console.debug('Запрос на получение кота');
    this.api.getCat(this.id).subscribe(
      data => {this.cat = new Cat(data) }, 
      error => {console.error(error)});
  }

  // addCat(name: string, birthday: string, breed: string, sexChar: string) {
  //   // var sex = this.newCatSex;
  //   // var birthday = new DatePipe("en-EN").transform(this.newCatBirthday, "yyyy-MM-dd")
  //   var cat = {name: name, birthday: birthday, breed: breed, sex: sexChar}
  //   this.api.createCat(cat);
  //   console.debug("Отправлен запрос на добавление нового кота!");
  //   this.loadAllCats();
  // }

  removeCat() {
    let id = this.cat.id;
    console.debug("Отправлен запрос на удаление кота!: " + this.cat.id);    
    this.api.removeCat(Number(id)).subscribe(
      (val) => {
        console.debug("DELETE call successful value returned in body", val);
        this.router.navigate(['']);
      },
      response => {console.error("Ошибка при запросе DELETE", response);},
      () => {console.debug("The DELETE observable is now completed.");});
    
  }

  editCat() {
    var cat = {id: this.cat.id, name: this.cat.name, birthday:this.cat.birthday, breed: this.cat.breed, sex: this.cat.sex}
    console.debug("Редактирование кота");
    this.api.editCat(cat).subscribe(
      (val) => this.loadCat(),
      (resp) => console.error(resp)
    );
    console.debug("Отправлен запрос на добавление нового кота!");
    // this.loadAllCats();
    this.backToCats()
  }

  backToCats(){
    this.router.navigate(['']);
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
    this.newCatBirthday = event.value;
    // this.getData(newDate);
  }

  ngOnInit() {
    // this.cats = [
    //   {
    //     id: 1,
    //     name: 'Кот1', 
    //     birthday: '2009-01-01', 
    //     breed: 'длинное название породы', 
    //     sex: 'w', 
    //     datetime: '2010-01-01'
    //   },
    //   {
    //     id: 2,
    //     name: 'Кот2', 
    //     birthday: '2009-01-01', 
    //     breed: 'breed', 
    //     sex: 'm', 
    //     datetime: '2010-01-01'
    //   }
    // ]
  }
}

