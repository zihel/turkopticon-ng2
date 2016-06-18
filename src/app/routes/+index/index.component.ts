import { Component, OnInit } from '@angular/core';
//import { CHART_DIRECTIVES } from 'angular2-highcharts';

@Component({
  moduleId: module.id,
  selector: 'app-index',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css'],
  //directives: [CHART_DIRECTIVES]
})
export class IndexComponent implements OnInit {
  options:Object;

  constructor() {
    this.options = {
      title: {text: 'test chart'},
      series: [{
        data:[29,21,53.1,4.32,35]
      }]
    };
  }

  ngOnInit() {
  }

}
