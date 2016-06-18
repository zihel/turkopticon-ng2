import { Component, OnChanges, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'review-overview',
  templateUrl: 'review-overview.component.html',
  styleUrls: ['review-overview.component.css']
})
export class ReviewOverviewComponent implements OnChanges {

  @Input() overviewData:any;
  searchLink:string;
  private API = 'https://www.mturk.com/mturk/searchbar';
  constructor() {}

  ngOnChanges() {
    console.log('ro',this.overviewData);
    this.searchLink = this.overviewData
      ? `${this.API}?requesterId=${this.overviewData.rid}&selectedSearchType=hitgroups`
      : null;
  }

}
