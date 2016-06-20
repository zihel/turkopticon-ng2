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
    temp: ['placeholder', 'navigation', 'items'],
    paths: ['reviews'],
    map: {},
    icon: {reviews: 'grid'}
  }
  constructor() {  }

}
