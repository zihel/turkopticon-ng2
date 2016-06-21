import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import { provideRouter } from '@angular/router';
import { AppComponent, environment } from './app/';

import {
  AboutComponent,
  FaqComponent,
  IndexComponent,
  MessagesComponent,
  RequestersComponent,
  ReviewsComponent,
  RulesComponent
} from './app/routes';

if (environment.production) {
  enableProdMode();
}
const routes:Array<any> = [
  {path: '', component: IndexComponent},
  {path: 'index', component: IndexComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'about', component: AboutComponent},
  {path: 'rules', component: RulesComponent},
  {path: 'reviews/:rid', component: ReviewsComponent},
  {path: 'reviews', component: ReviewsComponent},
  {path: 'requesters', component: RequestersComponent},
  {path: 'messages', component: MessagesComponent}
];
bootstrap(AppComponent, [
  provideRouter(routes),
  provideForms(),
  disableDeprecatedForms()
]);
