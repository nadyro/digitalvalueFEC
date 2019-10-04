import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private appService: AppService, private cookieService: CookieService) { }

  arrayCategories = new Array();
  firstLevelCategory: any;
  secondLevelCategory: any;
  thirdLevelCategory: any;
  sendVolumeId(element, categoriesLvl) {
    if (categoriesLvl === 1) {
      if (this.cookieService.get("firstLevelCategory"))
        this.cookieService.delete("secondLevelCategory");
      this.cookieService.set("firstLevelCategory", element.id);
      this.cookieService.set("firstLevelCategoryName", element.name);
      this.cookieService.set("steps", categoriesLvl)
    }
    if (categoriesLvl === 2) {
      if (this.cookieService.get("secondLevelCategory"))
        this.cookieService.delete("thirdLevelCategory");
      this.cookieService.set("secondLevelCategory", element.id);
      this.cookieService.set("secondLevelCategoryName", element.name);
      this.cookieService.set("steps", categoriesLvl)
    }
    if (categoriesLvl === 3) {
      this.cookieService.set("thirdLevelCategory", element.id);
      this.cookieService.set("thirdLevelCategoryName", element.name);
      this.cookieService.set("steps", categoriesLvl)
    }

    var obj = { volumeId: element.id, category: element.name };
    this.appService.emitVolumeId(obj);
  }

  ngOnInit() {
    this.firstLevelCategory = this.cookieService.get("firstLevelCategory");
    this.secondLevelCategory = this.cookieService.get("secondLevelCategory");
    this.thirdLevelCategory = this.cookieService.get("thirdLevelCategory");
    var i = 0;
    this.appService.getAllCategories().subscribe(res => {
      res.children.forEach(element => {
        if (element.id == this.firstLevelCategory * 1)
          element.isopen = true;
        else
          element.isopen = false;
        element.children.forEach(elem => {
          if (elem.id == this.secondLevelCategory * 1)
            elem.isopen = true;
          else
            elem.isopen = false;
          elem.children.forEach(el => {
            if (el.id == this.thirdLevelCategory * 1)
              el.isopen = true;
            else
              el.isopen = false;
          });
        });
        this.arrayCategories[i] = element;

        i++;
      });
      var steps = this.cookieService.get("steps");
      if (steps === "1")
        this.appService.volumeIdEmitter.emit({
          volumeId: this.firstLevelCategory,
          category: this.cookieService.get("firstLevelCategoryName")
        });
      else if (steps === "2")
        this.appService.volumeIdEmitter.emit({
          volumeId: this.secondLevelCategory,
          category: this.cookieService.get("secondLevelCategoryName")
        });
      else if (steps === "3")
        this.appService.volumeIdEmitter.emit({
          volumeId: this.thirdLevelCategory,
          category: this.cookieService.get("thirdLevelCategoryName")
        });
    })
  }

}
