import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { Observable } from 'rxjs/Rx';
// import 'rxjs/add/observable/from';
// import 'rxjs/add/observable/interval';
// import 'rxjs/add/observable/zip';

import { ReviewGroupComponent, ReviewOverviewComponent, ReviewService } from '../../review-group';

@Component({
  moduleId: module.id,
  selector: 'app-reviews',
  templateUrl: 'reviews.component.html',
  styleUrls: ['reviews.component.css'],
  directives: [ReviewGroupComponent, ReviewOverviewComponent],
  providers: [ReviewService]
})
export class ReviewsComponent implements OnInit {
  overviewData:Promise<any>;
  reviewData:Promise<any>;
  routeSub:any;
  // private source:any;

  constructor(
    public reviewService:ReviewService,
    private _router:Router,
    private _ar:ActivatedRoute) {
  }

  // routerOnActivate(curr:RouteSegment, tree?:RouteTree){
  //   this.param = curr.getParam('rid');
  //   this.fetchReviews(8);
  // }

  fetchReviews(n:number, id:string) {
    console.log('id: ',id);
    this.reviewService.getReviews(n, {rid: id }).then(v => { console.log('v: ', v); return v; })
      // .then(v => { this.source = v; console.log('initial creation:',this.source); })
      // .then(v => Observable.from(v, m => 'reviews' in m ? m.reviews : m))
      // .then(v => v.zip(Observable.interval(2000), p => p))
      // .then(v => v.subscribe(console.log.bind(console)))
      .then(v => (this.reviewData = Promise.resolve(v)) && v )
      .then(v => this.overviewData = Promise.resolve(v.length === 1 && 'reviews' in v[0] ? getOverview(v[0]) : null));
    function getOverview(obj) {
      let o = Object.assign({},obj);
      delete o.reviews;
      return o;
    }
  }
  ngOnInit() {
    console.log(this._ar);
    this.routeSub = this._ar.params.subscribe(p => {
      console.log(p);
      this.fetchReviews(8, p['rid']);
    });
    // console.log(this.location);
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
