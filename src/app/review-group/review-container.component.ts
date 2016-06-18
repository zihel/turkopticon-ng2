import { Component, OnInit, Input, } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router'

import { ReviewRatingComponent } from '../review-group';

@Component({
  moduleId: module.id,
  selector: 'review-container',
  templateUrl: 'review-container.component.html',
  styleUrls: ['review-container.component.css'],
  directives: [ReviewRatingComponent, ROUTER_DIRECTIVES],
  outputs: ['onRequestNav']
})
export class ReviewContainerComponent implements OnInit {

  constructor() { }

  @Input() data:any;

  ngOnInit() {
  }

}
