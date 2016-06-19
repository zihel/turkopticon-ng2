import { Component, OnInit, OnDestroy, EventEmitter, Output, ViewChild } from '@angular/core';
import {
  REACTIVE_FORM_DIRECTIVES,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  RadioButtonState
} from '@angular/forms';
import 'rxjs/add/operator/distinctUntilChanged';

class Validator extends Validators {
  static requiredRadioGroup(c:FormGroup):{[error:string]:boolean} {
    return Object.keys(c.controls)
      .map(v => c.controls[v].value.checked)
      .reduce((a,b) => a || b) ? null : {requiredRadioGroup:true};
  }
  static minValue(n:number):Function {
    return (c:FormControl):{[error:string]:boolean} =>
      isNaN(c.value) || +c.value < n ? {outOfRange:true} : null;
  }
}

class Duration {
  constructor(private _hours:number, private _minutes:number, private _seconds:number) {  }
  get value() {
    return (this._hours * 60 * 60) + (this._minutes * 60) + this._seconds;
  }
  set hours(n:number) {
    this._hours = +n;
  }
  set minutes(n:number) {
    this._minutes = +n;
  }
  set seconds(n:number) {
    this._seconds = +n;
  }
}

@Component({
  moduleId: module.id,
  selector: 'review-form',
  templateUrl: 'review-form.component.html',
  styleUrls: ['review-form.component.css'],
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class ReviewFormComponent implements OnInit, OnDestroy {
  windowY:number = window.innerHeight;
  labels:any;
  dependents:FormGroup;
  hitTime:Duration = new Duration(0,0,0);
  formMode:string = 'single';
  reviewForm:FormGroup;
  subscriptions:any[] = [];

  @ViewChild('somePending') somePending;
  @ViewChild('someRejected') someRejected;
  @Output() onCancel = new EventEmitter<any>();
  cancel() {
    this.onCancel.emit(true);
  }

  constructor(public fb:FormBuilder) {
    this.reviewForm = fb.group({
      hitTitle: [null, Validator.required],
      pay: [null, [Validator.required, Validator.minValue(0)]],
      rid: [null, Validator.required],
      rname: [null, Validator.required],
      broken: [false],
      deceptive: [false],
      tos: [false],
      didIt: [null, Validator.required],
      comments: [null]
    });
    this.dependents = fb.group({
      broken_: [null, [Validator.minLength(10), Validator.required]],
      deceptive_: [null, [Validator.minLength(10), Validator.required]],
      tos_: [null, [Validator.minLength(10), Validator.required]],
      isBatch: [null, Validator.required],
      time: [null, [Validator.required, Validator.minValue(1)]],
      pending: [null, Validator.required],
      comm: [null],
      rejected: [null, Validator.required],
      reviewTime: [null]
    });
    this.labels = {
      title: 'HIT Title',
      pay: 'HIT Reward',
      rid: 'Requester ID',
      rname: 'Requester Name',
      broken: 'This HIT has techinal issues',
      broken_: 'Please explain how the HIT is broken',
      deceptive: 'This HIT is deceptive',
      deceptive_: 'Please explain how the HIT is deceptive.',
      tos: 'This HIT violates the Mechanical Turk Terms of Service.',
      tos_: 'Please explain how the HIT violates the Mechanical Turk Terms of Service.',
      didIt: 'Did you complete one of these HITs?',
      isBatch: 'Did you do more than one of these HITs?',
      time: 'About how long did it take you to do the HIT?',
      pending: 'Is your work still pending approval?',
      reviewTime: 'How long did it take the requester to approve or reject your work?',
      noPending: 'No', allPending: 'Yes',
      appTime: 'How long did the requester take to approve or reject your work?',
      rejected: 'Was your work rejected?',
      allRejected: 'Yes',
      overturned: 'Yes, but it was overturned',
      fair: 'Do you think the rejection was fair?',
      fair_: 'Please feel free to explain what happned here.',
      comm: 'Did you try to contact the requester about the HIT?',
      commSatisfaction: 'Did the requester respond to your satisfaction?',
      comments: 'Please feel free to add any additional information here.'
    };
  }
  onSubmit(...forms) {
    console.log('form',forms);
  }
  toggleFormMode(m:any):void {
    const isBatch = m === 'batch';
    this.formMode = m;
    ['pay','time'].forEach(v => this.labels[v] = this.labels[v]
      .replace((isBatch ? 'the' : 'each'), (isBatch ? 'each' : 'the')) )
    this.labels.noPending = isBatch ? 'No, they\'ve all been either approved or rejected' : 'No';
    this.labels.allPending = isBatch ? 'Yes, all of them' : 'Yes';
    this.labels.allRejected = isBatch ? 'Yes, all of it'  : 'Yes';
    this.labels.overturned = isBatch
      ? this.labels.overturned.replace('it was','they were')
      : this.labels.overturned.replace('they were','it was');
  }
  hasError(tpath:string, cpath?:string):boolean {
    let target, condition;
    tpath.split('.').forEach(v => target = (target || this.reviewForm).find(v));
    cpath && cpath.split('.').forEach(v => condition = (condition || this.reviewForm).find(v));
    if (!cpath) return !!target.errors;
    else return !!target._parent.errors || target.value.checked && !condition.value.checked ? true : false
  }
  // conditional(tpath:string, cpath:string, condition:string):boolean {
  //   const root:FormGroup = <FormGroup>this.reviewForm.find(tpath.split('.')[0]);
  //   const val:string = Object.keys(root.controls)
  //     .reduce((a,b) => root.find(b).value.checked ? root.find(b).value.value : a, null);
  //   return !this.hasError(tpath,cpath) && val !== condition;
  // }

  setControls(state:boolean, control:string|string[]):void {
    const addControl = (control:string):void => {
      this.reviewForm.addControl(control, this.dependents.controls[control]);
    };
    const removeControl = (control:string):void => {
      if (!this.reviewForm.find(control)) return null;
      (<FormControl>this.reviewForm.controls[control]).updateValue(null);
      this.reviewForm.removeControl(control);
    };

    if (!state)
      return Array.isArray(control)
        ? control.forEach(removeControl)
        : removeControl(control);
    else
      return Array.isArray(control)
        ? control.forEach(addControl)
        : addControl(control);
  }
  // subscribeTo(f:FormGroup, path:string, property:string, callback:Function):any {
  subscribeTo(path:string, property:string, callback:Function):any {
    // let target;
    // path.split('.').forEach(v => target = (target || f).find(v));
    const [form,control] = path.split('.');
    return this[form].find(control)[property+'Changes'].distinctUntilChanged().subscribe(callback);
  }
  setRadioValue(path:string, value:string):void {
    //
    // XXX: might not be necessary in RC3 or next iteration of angular/forms
    //
    (<FormControl>this.reviewForm.controls[path]).updateValue(value);
  }
  ngOnInit() {
    for (let c of ['broken', 'deceptive', 'tos'])
      this.subscriptions.push( this.subscribeTo('reviewForm.'+c, 'value', v => this.setControls(v, c+'_')) );

    const details:string[] = ['time', 'pending', 'comm'];
    this.subscriptions.push( this.subscribeTo('reviewForm.didIt', 'value', v => this.setControls(v === 'yes', 'isBatch')) );
    this.subscriptions.push( this.subscribeTo('dependents.isBatch', 'status', v => this.setControls(v === 'VALID', details )))
    this.subscriptions.push( this.subscribeTo('dependents.isBatch', 'value', v => {
      if (v === 'no') {
        ['pending','rejected'].forEach( c => this.reviewForm.find(c)
          && this.reviewForm.find(c).value === 'some'
          && this.setRadioValue(c,null) );
        if (this.somePending) this.somePending.nativeElement.checked = false;
        if (this.someRejected) this.someRejected.nativeElement.checked = false;
      }
    }) );
    this.subscriptions.push( this.subscribeTo('dependents.pending', 'value', v =>
      this.setControls(!!v && v !== 'yes', ['reviewTime','rejected'] )))
    console.log(this.subscriptions);
  }
  ngOnDestroy() {
    this.subscriptions.forEach(v => v.unsubscribe());
  }

}
