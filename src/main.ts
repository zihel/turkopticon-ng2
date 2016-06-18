import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import { provideRouter } from '@angular/router';
import { AppComponent, environment } from './app/';

import { FaqComponent } from './app/+faq';
import { AboutComponent } from './app/+about';
import { IndexComponent } from './app/+index';
import { ReviewsComponent } from './app/+reviews';

if (environment.production) {
  enableProdMode();
}
const routes:Array<any> = [
  {path: '/faq', component: FaqComponent},
  {path: '/about', component: AboutComponent},
  {path: '/index', component: IndexComponent},
  {path: '', component: IndexComponent},
  {path: '/reviews/:rid', component: ReviewsComponent},
  {path: '/reviews', component: ReviewsComponent}
];
bootstrap(AppComponent, [
  provideRouter(routes),
  provideForms(),
  disableDeprecatedForms()
]);
