import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  api_url = "/assets/api";
  api_current_level = "/volumes-0.json";
  api_categories = "/categories.json";
  constructor(private http: HttpClient) { }

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
  getFirstVolume(): Observable<any> {
    return this.http.get(this.api_url + this.api_current_level).pipe(map(res => {
      return (res);
    }));
  }
}
