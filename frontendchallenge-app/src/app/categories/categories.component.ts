import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private appService: AppService) { }

  firstLevelIndexCategories = 0;
  secondLevelIndexCategories = 0;
  thirdLevelIndexCategories = 0;
  arrayCategories = new Array();
  ngOnInit() {
    var i = 0;
    this.appService.getAllCategories().subscribe(res => {
      res.children.forEach(element => {
        this.arrayCategories[i] = element;
        i++;
      });
      /*Categories as such :
                                        Categories
      Brands                              Products                            Others
Ind#1     Ind#2     Ind#3         Typ#1       Typ#2     Typ#3       Cat#1     Cat#2     Cat#3
Id  Name  Id  Name  Id  Name      Id  Name    Id  Name  Id  Name    Id  Name  Id  Name  Id  Name
      */
      this.arrayCategories.forEach(element => {
        element.children.forEach(elem => {
          elem.children.forEach(elmnt => {
            console.log(elmnt);
            this.thirdLevelIndexCategories++;
          });
          this.secondLevelIndexCategories++;
        });
        this.firstLevelIndexCategories++;
      })
    })
  }

}
