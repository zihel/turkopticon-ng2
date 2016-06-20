import { Component, OnChanges, Input } from '@angular/core';
import { ReviewFormComponent } from '../review-form';

@Component({
  moduleId: module.id,
  selector: 'review-overview',
  templateUrl: 'review-overview.component.html',
  styleUrls: ['review-overview.component.css'],
  directives: [ReviewFormComponent]
})
export class ReviewOverviewComponent implements OnChanges {

  @Input() overviewData:any;
  searchLink:string;
  showForm:boolean = false;
  private API = 'https://www.mturk.com/mturk/searchbar';
  constructor() {}

  toggleForm(e?:any) {
    if (e) e.preventDefault();
    this.showForm = !this.showForm;
  }

  ngOnChanges() {
    console.log('ro',this.overviewData);
    this.searchLink = this.overviewData
      ? `${this.API}?requesterId=${this.overviewData.rid}&selectedSearchType=hitgroups`
      : null;
  }

}
