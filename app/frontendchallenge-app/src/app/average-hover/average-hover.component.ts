import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-average-hover',
  templateUrl: './average-hover.component.html',
  styleUrls: ['./average-hover.component.scss']
})
export class AverageHoverComponent implements OnInit {

  constructor(private appService: AppService) { }
  arrayMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  element;
  maxValue = 0;
  volumes_per_months: Array<any> = new Array();
  removePopupStyle(element) {
    element.classList.remove("displayCloseButton");
  }
  hoverPopup(element) {
    element.classList.add("displayCloseButton");
  }
  flushGraph() {
    this.volumes_per_months.splice(0, this.volumes_per_months.length);
    this.volumes_per_months = null;
    this.element = null;
  }
  ngOnInit() {
    this.appService.averageGraph.subscribe(res => {
      if (res.volumes_per_months) {
        res.volumes_per_months.forEach(element => {
          if (element.volume > this.maxValue)
            this.maxValue = element.volume;
        });
        this.element = res.element;
        this.volumes_per_months = res.volumes_per_months;
      }
    })
  }

}
