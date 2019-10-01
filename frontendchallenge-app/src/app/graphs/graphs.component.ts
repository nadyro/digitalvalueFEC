import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  constructor(private appService: AppService) { }

  indexToDisplayVolumes = 0;
  indexMonths = 0;
  arrayMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  count = 0;
  ongoingResearch = "";
  maxVolumesYears = 0;
  maxVolumesPerYear = 0;
  volumeIdSelected = "";
  volumes_height: Array<any> = new Array();
  volumes_per_year: Array<any> = new Array();
  volumes_sum_year: Array<any> = new Array();

  flushArray(array: Array<any>) {
    array.splice(0, array.length);
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
