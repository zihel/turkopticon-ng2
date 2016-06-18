import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { ReviewFormComponent } from './review-form';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES, ReviewFormComponent]
})
export class AppComponent {
  title = 'turkopticon mockup';
  showForm:boolean = false;
  footPaths = {
    temp: ['index', 'about', 'rules', 'FAQ'],
    paths: ['index', 'about', 'rules', 'FAQ'],
    map: {index: 'home'}
  };
  headPaths = {
    temp: ['placeholder', 'navigation', 'items'],
    paths: ['reviews'],
    map: {},
    icon: {reviews: 'grid'}
  }
  toggleForm(e?:any) {
    if (e) e.preventDefault();
    this.showForm = !this.showForm;
  }
  // constructor(private router:Router) { }
  constructor() {  }

}


// @Routes([
//   {path: '/faq', component: FaqComponent},
//   {path: '/about', component: AboutComponent},
//   {path: '/index', component: IndexComponent},
//   {path: '', component: IndexComponent},
//   {path: '/reviews/:rid', component: ReviewsComponent},
//   {path: '/reviews', component: ReviewsComponent}
// ])
