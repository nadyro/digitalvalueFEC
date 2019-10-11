import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  constructor(public appService: AppService, public cookieService: CookieService) { }

  indexToDisplayVolumes = 0;
  indexMonths = 0;
  arrayMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  count = 0;
  ongoingResearch = "";
  maxVolumesYears = 0;
  maxVolumesPerYear = 0;
  volumeIdSelected = "";
  tmpFirstLevelCategory:any;
  volumes_height: Array<any> = new Array();
  volumes_per_year: Array<any> = new Array();
  volumes_sum_year: Array<any> = new Array();
  volumes_per_months: Array<any> = new Array();


  flushGraph(element) {
    this.flushArray(this.volumes_per_months);
    this.volumes_per_months = null;
    var emptyGraph = { element: element, volumes_per_months: this.volumes_per_months };
    this.appService.emitAverageData(emptyGraph);
  }

  displayAverage(element, volume, volumeIdSelected) {
    this.flushArray(this.volumes_per_months);
    var month = this.arrayMonths.indexOf(volume.month) + 1;
    var indexMonth = 0;
    this.appService.getVolumeById(volumeIdSelected).subscribe(res => {
      res.forEach(element => {
        indexMonth = element.timespan.split('-')[1] * 1;
        if (indexMonth == month) {
          element.month = indexMonth - 1;
          element.timespan = element.timespan.split('-')[0];
          this.volumes_per_months.push(element);
        }
      });
      var averageGraphData = { element: element, volumes_per_months: this.volumes_per_months };
      this.appService.emitAverageData(averageGraphData);
    });
  }

  flushArray(array: Array<any>) {
    array.splice(0, array.length);
  }

  appendDetailedVolumes(volume_element) {
    this.maxVolumesPerYear = 0;
    this.indexToDisplayVolumes = volume_element.id;
    this.cookieService.set("yearSelected", this.indexToDisplayVolumes + '');
    this.volumes_per_year[this.indexToDisplayVolumes].volumes_height.forEach(element => {
      if (this.maxVolumesPerYear < element.volume) {
        this.maxVolumesPerYear = element.volume;
      }
    });
  }

  volumesSubscription(volume_id) {

    var yearToStartArray = "";
    var sumYears = 0;
    var index = 0;
    this.maxVolumesYears = 0;
    this.volumeIdSelected = volume_id;
    this.appService.getVolumeById(volume_id).subscribe(res => {

      yearToStartArray = res[0].timespan.split('-')[0];

      res.forEach(element => {
        var volume_year = element.timespan.split('-')[0];

        if (volume_year !== yearToStartArray) {
          this.volumes_per_year[this.count] = { volumes_height: this.volumes_height, year: yearToStartArray };
          this.volumes_height = [];
          this.count++;
          yearToStartArray = volume_year;
          this.indexMonths = 0;
        }
        this.volumes_height.push({ volume: element.volume / 1000, month: this.arrayMonths[this.indexMonths] });
        this.indexMonths++;
      });


      if (this.volumes_height.length > 0) {
        this.volumes_per_year[this.count] = { volumes_height: this.volumes_height, year: yearToStartArray };
      }

      this.volumes_per_year.forEach(element => {
        element.volumes_height.forEach(elem => {
          sumYears += elem.volume * 1000;
        });

        if (sumYears > this.maxVolumesYears)
          this.maxVolumesYears = sumYears;

        this.volumes_sum_year.push({ sum: sumYears, index: index, year: element.year });
        sumYears = 0;
        index++;
      });
      this.volumes_per_year[0].volumes_height.forEach(element => {
        if (this.maxVolumesPerYear < element.volume) {
          this.maxVolumesPerYear = element.volume;
        }
      });
    });
  }

  ngOnInit() {
    this.appService.volumeIdEmitter.subscribe(res => {
      this.flushArray(this.volumes_height);
      this.flushArray(this.volumes_per_year);
      this.flushArray(this.volumes_sum_year);
      this.count = 0;
      this.maxVolumesPerYear = 0;
      this.indexToDisplayVolumes = 0;
      this.indexMonths = 0;
      this.ongoingResearch = res.category;
      this.volumesSubscription(res.volumeId);
    })
  }

}
