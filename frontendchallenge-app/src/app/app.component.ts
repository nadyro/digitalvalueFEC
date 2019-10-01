import { Component, OnInit, HostBinding } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'G.O.D';
  constructor(private appService: AppService) {
  }
  ngOnInit() {
  }
}
