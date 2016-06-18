import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'review-rating',
  templateUrl: 'review-rating.component.html',
  styleUrls: ['review-rating.component.css']
})
export class ReviewRatingComponent implements OnInit {

  constructor() {}
  @Input() data:any;
  ngOnInit() {
  }

}
