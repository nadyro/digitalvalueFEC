import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  api_url = "/assets/api";
  api_categories = "/categories.json";
  @Output() volumeIdEmitter: EventEmitter<any> = new EventEmitter();
  @Output() averageGraph: EventEmitter<any> = new EventEmitter();
  
  data: {};
  constructor(private http: HttpClient) { }

  emitAverageData(object){
    this.data = {element: object.element, volumes_per_months: object.volumes_per_months};
    this.averageGraph.emit(this.data);
  }
  emitVolumeId(object) {
    this.data = { volumeId: object.volumeId, category: object.category };
    this.volumeIdEmitter.emit(this.data);
  }
  getVolumeById(id): Observable<any> {
    return this.http.get(this.api_url + '/volumes-' + id + '.json').pipe(map(res => {
      return (res);
    }))
  }
  getAllCategories(): Observable<any> {
    return this.http.get(this.api_url + this.api_categories).pipe(map(res => {
      return (res);
    }));
  }
}
