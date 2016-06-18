import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, RadioButtonState } from '@angular/common';

class Validator extends Validators {
  static isFreeResponseRequired(c:ControlGroup):{[error:string]:boolean} {
    const [dependency, dependent] = Object.keys(c.controls).map(v => c.controls[v]);
    // if (!dependency.value) dependent._value = '';
    return !dependency.value || dependency.value && dependent.value.length > 5
      ? null : {freeResponseRequired:true};
  }
  static requiredRadioGroup(c:ControlGroup):{[error:string]:boolean} {
    return Object.keys(c.controls)
      .map(v => c.controls[v].value.checked)
      .reduce((a,b) => a || b) ? null : {requiredRadioGroup:true};
  }
  static invalidDuration(c:ControlGroup):{[error:string]:boolean} {
    return Object.keys(c.controls)
      .map(v => +c.controls[v].value)
      .reduce((a,b) => a + b) > 0 ? null : {invalidDuration:true};
  }
  static conditionalPending(c:ControlGroup):{[error:string]:boolean} {
    console.log(c);
    // const batch = (<ControlGroup>c.root).controls['isBatch'].value.checked;
    // const somePending = c.controls['somePending'].value.checked;
    // if (somePending && !batch) return {conditionalPending:true}
    return null;
  }
}
@Component({
  moduleId: module.id,
  selector: 'review-form',
  templateUrl: 'review-form.component.html',
  styleUrls: ['review-form.component.css'],
  directives: [FORM_DIRECTIVES]
})
export class ReviewFormComponent implements OnInit {
  windowY:number = window.innerHeight;
  labels:any;
  detailsForm:ControlGroup;
  reviewForm:ControlGroup;
  formMode:string = 'single'

  @Output() onCancel = new EventEmitter<any>();
  cancel() {
    this.onCancel.emit(true);
  }

  constructor(public fb:FormBuilder) {
    this.reviewForm = fb.group({
      hitTitle: ['', Validator.required],
      pay: [null, c => c.value !== null && c.value >= 0 ? null : {invalidPay:true}],
      rid: ['', Validator.required],
      rname: ['', Validator.required],
      brokenGroup: fb.group({
        broken: [false],
        broken_: ['']
      }, {validator: Validator.isFreeResponseRequired}),
      deceptiveGroup: fb.group({
        deceptive: [false],
        deceptive_: ['']
      }, {validator: Validator.isFreeResponseRequired}),
      tosGroup: fb.group({
        tos: [false],
        tos_: ['']
      }, {validator: Validator.isFreeResponseRequired}),
      didIt: fb.group({
        yesDidIt: [new RadioButtonState(false,'yes')],
        noDidIt: [new RadioButtonState(false,'no')]
      }, {validator: Validator.requiredRadioGroup}),
      comments: ['']
    });
    this.detailsForm = fb.group({
      isBatch: fb.group({
        yesBatch: [new RadioButtonState(false,'yes')],
        noBatch: [new RadioButtonState(false,'no')]
      }, {validator: Validator.requiredRadioGroup}),
      time: fb.group({
        timeH: [], timeM: [], timeS: [],
      }, {validator: Validator.invalidDuration}),
      pending: fb.group({
        allPending:  [new RadioButtonState(false,'yes')],
        somePending: [new RadioButtonState(false,'some')],
        noPending:   [new RadioButtonState(false,'no')]
      }, { validator: Validator.requiredRadioGroup }),
      rejected: fb.group({
        allRejected:  [new RadioButtonState(false,'yes')],
        someRejected: [new RadioButtonState(false, 'some')],
        noRejected:   [new RadioButtonState(false,'no')]
      }, {validator: Validator.requiredRadioGroup}),
      fair: fb.group({
        yesFair: [new RadioButtonState(false,'yes')],
        noFair:  [new RadioButtonState(false,'no')]
      }),
      fair_: [''],
      comm: fb.group({
        yesComm: [new RadioButtonState(false,'yes')],
        noComm:  [new RadioButtonState(false,'no')],
      }),
      commSatisfaction: fb.group({
        yesCommSatisfaction: [new RadioButtonState(false,'yes')],
        noCommSatisfaction: [new RadioButtonState(false,'no')]
      })
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
      noPending: 'No', allPending: 'Yes',
      appTime: 'How long did the requester take to approve or reject your work?',
      rejected: 'Was your work rejected?',
      allRejected: 'Yes',
      fair: 'Do you think the rejection was fair?',
      fair_: 'Please feel free to explain what happned here.',
      comm: 'Did you try to contact the requester about the HIT?',
      commSatisfaction: 'Did the requester respond to your satisfaction?',
      comments: 'Please feel free to add any additional information here.'
    };
  }
  onSubmit(...forms) {
    //
    // TODO: collapse control groups values
    //
    console.log('form',forms);
    console.log(this.reviewForm.controls,this.detailsForm.controls)
    window['xx'] = this.detailsForm
  }
  toggleFormMode(m:any):void {
    const isBatch = m === 'batch';
    this.formMode = m;
    ['pay','time'].forEach(v => this.labels[v] = this.labels[v]
      .replace((isBatch ? 'the' : 'each'), (isBatch ? 'each' : 'the')) )
    this.labels.noPending = isBatch ? 'No, they\'ve all been either approved or rejected' : 'No';
    this.labels.allPending = isBatch ? 'Yes, all of them' : 'Yes';
    this.labels.allRejected = isBatch ? 'Yes, all of it'  : 'Yes';
  }
  hasError(f:ControlGroup, tpath:string, cpath?:string):boolean {
    // const target = f.find(path);
    let target, condition;
    tpath.split('.').forEach(v => target = (target||f).find(v));
    cpath && cpath.split('.').forEach(v => condition = (condition||f).find(v));
    if (!cpath) return !!target.errors;
    else return !!target._parent.errors || target.value.checked && !condition.value.checked ? true : false
  }
  conditional(f:ControlGroup, tpath:string, cpath:string, condition:string) {
    const root:ControlGroup = <ControlGroup>f.find(tpath.split('.')[0]);
    const val:string = Object.keys(root.controls)
      .reduce((a,b) => root.find(b).value.checked ? root.find(b).value.value : a, null);
    return !this.hasError(f,tpath,cpath) && val !== condition;

  }

  ngOnInit() {
  }

}
