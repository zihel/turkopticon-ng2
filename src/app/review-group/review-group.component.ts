import { Component, OnChanges, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/timer';

import { ReviewContainerComponent } from '../review-group';

@Component({
  moduleId: module.id,
  selector: 'review-group',
  templateUrl: 'review-group.component.html',
  styleUrls: ['review-group.component.css'],
  directives: [ReviewContainerComponent]
})
export class ReviewGroupComponent implements OnChanges {

  reviews:Array<any> = [];
  test;
  @Input() reviewData:any;

  constructor() {
  }


  ngOnChanges() {
    console.log('review data:',this.reviewData);
    // this.reviewData.subscribe(this.reviews.push)
    this.reviews = this.reviewData && this.reviewData.length === 1 && 'reviews' in this.reviewData[0] ?
      this.reviewData[0].reviews : this.reviewData;

    // Observable.timer(2000,2000).take(4).mapTo([]).subscribe(console.log.bind(console));
    // this.test =Observable.merge(Observable.from([9,8,7,6,5,4]),Observable.timer(2000,2000).take(6))
    // .subscribe(console.log.bind(console))
  }

}
