import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private appService: AppService) { }

  arrayCategories = new Array();

  sendVolumeId(element) {
    var obj = { volumeId: element.id, category: element.name };
    this.appService.emitVolumeId(obj);
  }

  ngOnInit() {
    var i = 0;
    this.appService.getAllCategories().subscribe(res => {
      res.children.forEach(element => {
        this.arrayCategories[i] = element;
        i++;
      });
    })
  }

}
