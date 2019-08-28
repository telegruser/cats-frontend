import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiService } from '../api.service';
import { MatDatepickerInputEvent } from '@angular/material';
import { Router } from '@angular/router';
import { CatInterface } from '../models';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css']
})
export class CatsComponent implements OnInit {

  cats : CatInterface[];
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

  constructor(private api: ApiService, private router: Router) {}

  loadAllCats() {
    console.debug('Запрос на получение всех котов');
    this.api.getAllCats().subscribe(
      data => {this.cats = data}, 
      error => {console.error(error)});
  }

  addCat(name: string, birthday: string, breed: string, sexChar: string) {
    // var sex = this.newCatSex;
    // var birthday = new DatePipe("en-EN").transform(this.newCatBirthday, "yyyy-MM-dd")
    var cat = {name: name, birthday: birthday, breed: breed, sex: sexChar}
    this.api.createCat(cat).subscribe(
      data => this.loadAllCats(),
      err => console.error(err)
    );
    console.debug("Отправлен запрос на добавление нового кота!");
    // this.loadAllCats();
  }

  removeCat(catIdStr: string) {
    this.cats = this.cats.filter(cat => cat.id != Number(catIdStr))
    console.debug("Отправлен запрос на удаление кота!: " + catIdStr);    
    this.api.removeCat(Number(catIdStr)).subscribe(
      (val) => {
        console.debug("DELETE call successful value returned in body", val);
        this.loadAllCats();
      },
      response => {console.error("Ошибка при запросе DELETE", response);},
      () => {console.debug("The DELETE observable is now completed.");});
    
  }

  editCat(id: number) {
    // var cat = {id: id, name: name, birthday:birthday, breed: breed, sex: sex}
    // console.debug("Редактирование кота");
    // this.api.editCat(cat).subscribe(
    //   (val) => { this.loadAllCats(); },
    //   (resp) => {console.error("Ошибка при удалении")}
    // );
    // console.debug("Отправлен запрос на добавление нового кота!");
    // console.error(typeof(id))
    this.router.navigate(['/cat', id.toString()])
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
    this.newCatBirthday = event.value;
    // this.getData(newDate);
  }

  ngOnInit() {
    this.loadAllCats();
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

