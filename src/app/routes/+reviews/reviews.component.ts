import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/from';
// import 'rxjs/add/observable/interval';
// import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { ReviewGroupComponent, ReviewOverviewComponent, ReviewService } from '../../review-group';

@Component({
  moduleId: module.id,
  selector: 'app-reviews',
  templateUrl: 'reviews.component.html',
  styleUrls: ['reviews.component.css'],
  directives: [ReviewGroupComponent, ReviewOverviewComponent, REACTIVE_FORM_DIRECTIVES],
  providers: [ReviewService]
})
export class ReviewsComponent implements OnInit {
  filterSub:any;
  filter:FormControl = new FormControl();
  filteredData:Promise<any> | Observable<any>;
  overviewData:Promise<any>;
  reviewData:any;
  routeSub:any;
  // private source:any;

  constructor( public reviewService:ReviewService,
               private _router:Router,
               private _ar:ActivatedRoute) {
    this.filterSub = this.filter.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(v => this.filteredData = this.filterReviews(v, this.reviewData));
  }

  /*
   * TODO: temp POC only; needs rewrite
   *       split entire filtering process into separate service
   */
  filterReviews(needle:string, stack:Array<any>):Promise<any> {
    if (!needle.trim()) return Promise.resolve(stack);
    return Promise.resolve(stack
      .filter(v => {
        const title = v['title'] || v['review'].title;
        return new RegExp(needle,'i').test(title)
      }))
  }
  fetchReviews(n:number, id:string) {
    this.reviewService.getReviews(n, {rid: id })
      .then(v => (this.reviewData = 'reviews' in v[0] ? v[0].reviews : v.map(r => r)) && v)
      .then(v => (this.filteredData = Promise.resolve(v)) && v)
      .then(v => this.overviewData = Promise.resolve(v.length === 1 && 'reviews' in v[0] ? getOverview(v[0]) : null));
    function getOverview(obj) {
      let o = Object.assign({},obj);
      delete o.reviews;
      return o;
    }
  }
  ngOnInit() {
    // console.log(this._ar);
    // console.log(this._router);
    this.routeSub = this._ar.params
      .map(p => p['rid'])
      .subscribe(rid => this.fetchReviews(13, rid));
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.filterSub.unsubscribe();
  }

}
