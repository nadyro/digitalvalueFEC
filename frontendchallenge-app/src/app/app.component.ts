import { Component, OnInit, HostBinding } from '@angular/core';
import { AppService } from './services/app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'G.O.D';

  indexToDisplayVolumes = 0;
  indexMonths = 0;
  arrayMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  count = 0;
  maxVolumesYears = 0;
  maxVolumesPerYear = 0;
  volumes_height: Array<any> = new Array();
  volumes_per_year: Array<any> = new Array();
  volumes_sum_year: Array<any> = new Array();
  constructor(private appService: AppService) {

  }

  appendDetailedVolumes(volume_element) {
    this.maxVolumesPerYear = 0;
    this.indexToDisplayVolumes = volume_element.id;
    this.volumes_per_year[this.indexToDisplayVolumes].volumes_height.forEach(element => {
      if (this.maxVolumesPerYear < element.volume) {
        this.maxVolumesPerYear = element.volume;
      }
    });
  }

  ngOnInit() {
    var yearToStartArray = "";
    var sumYears = 0;
    var index = 0;
    this.maxVolumesYears = 0;


    this.appService.getFirstVolume().subscribe(res => {

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
}
