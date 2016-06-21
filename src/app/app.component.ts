import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {
  title = 'turkopticon mockup';
  footPaths = {
    paths: ['index', 'about', 'rules', 'faq'],
    map: {index: 'home', faq: 'FAQ'}
  };
  headPaths = {
    paths: ['reviews','requesters','messages'],
    map: {},
    icon: {
      reviews: 'view_list',
      requesters: 'bubble_chart',
      messages: 'email'
    }
  }
  constructor() {  }

}
