import { Injectable } from '@angular/core';

class ReviewSingleton {
  constructor(obj:any) {
    Object.assign(this,obj);
  }
}
@Injectable()
export class ReviewService {

  private aliasSeed = <any>['Derelict', 'Tuberculosi McAdams', 'Pico Tikhaya', 'Wavybone', 'Neo-Pareto Lemma', 'Fine Whine', 'looseyCannons Mayhem Conglomerate', 'Eyes Closed', 'Old Milk', 'Billestine Jones', 'trailofgarments', 'Panamera Integurl', 'wtb excuses', 'Stolen nights', 'steadyshades'];
  constructor() {
    this.aliasSeed.random = function(){ return this[getRandomInt(0,this.length-1)]; };
  }

  getReviews(num:number, opt?:any):Promise<any> {
    // TODO: make it actually query the server for data
    return this.generateFakeReviews(num, opt);
  }

  private generateFakeReviews(num:number, opt?:any):Promise<any> {
    let data = [];

    return new Promise(resolve => {
      if (opt && opt.rid)
        data.push(this.generateForId(num,opt));
      else
        repeat( num, n => data.push(this.generateGlobal(n)) );
      resolve(data);
    });
  }

  private makeReview(num:number) {
    return {
      user: `Some User ${('000'+num).slice(-3)}`,
      text: getIpsum(),
      title: getTitle(),
      time: new Date().toString(),
      attrs: {},
      tos: {
        violation: getRandomInt(1,10) >= 9 ? true : false,
        reason: 'expected iced out custom made screen doors on dubs, instead got ice cream flavored nacho cheese'
      }
    };
  }
  private generateGlobal(num:number):ReviewSingleton {
    let atom = <any>{};
    atom.name = `${generateName()} ${romanize(num)}`;
    atom.rid = hash(atom.name);
    atom.aliases = [];
    if (num%3 === 1)
      repeat(getRandomInt(1,4), () => atom.aliases.push(`${this.aliasSeed.random()} ${romanize(num)}`) );
    atom.review = this.makeReview(num);
    return new ReviewSingleton(atom);
  }

  private generateForId(num:number, opt:any):any {
    let atom = <any>{};
    // for(let key of ['rid','name','aliases']) atom[key] = opt[key];
    atom.name = (`${generateName()} ${romanize(+atom.rid)}`);
    atom.rid = opt.rid || hash(atom.name);
    atom.aliases = [];
    repeat(getRandomInt(1,5), () => atom.aliases.push(`${this.aliasSeed.random()} ${romanize(getRandomInt(1,10))}`) );
    atom.aliases = atom.aliases.filter((v,i,a) => a.indexOf(v) === i);
    atom.globalAttrs = { pay:getRandomInt(100,2500)/100, fair:getRandomInt(100,500)/100, fast:getRandomInt(100,500)/100, comm:getRandomInt(100,500)/100 };
    atom.reviews = [];
    repeat( num, n => atom.reviews.push(this.makeReview(n) ));
    atom.tosFlags = atom.reviews.filter(v => v.tos.violation).length;
    atom.comments = [];
    return atom;
  }
}

function repeat(n:number, fn:Function, ...args:any[]):void { while(n--) fn(n, ...args) }
function romanize(n:number) {
  const map = { 1000: 'M', 900: 'CM', 500: 'D', 400: 'CD', 100: 'C', 90: 'XC', 50: 'L', 40: 'XL', 10: 'X', 9: 'IX', 5: 'V', 4: 'IV', 1: 'I' };
  let result = [];
  Object.keys(map).reverse().forEach(v => Math.floor(n/+v) && result.push(map[v].repeat(Math.floor(n/+v))) && (n %= +v));
  return result.join('');
}
function getRandomInt(min:number, max:number) {
  return Math.floor(Math.random() * (max-min+1)+min);
}
function getIpsum ():string {
  return [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rutrum sem sit amet dolor efficitur, at hendrerit nisi mollis. Nam euismod quis ipsum eu ultrices. Donec mauris dui, placerat vel elementum sed, vulputate vel sem. Nullam malesuada sagittis diam, ac venenatis eros gravida a. Donec pharetra ipsum commodo, faucibus mi et, suscipit nulla. Integer a mauris sagittis, lacinia ex nec, varius libero. Pellentesque ornare neque quis lacus ullamcorper imperdiet. Nullam eget sollicitudin nisi. Quisque eu dui non velit interdum hendrerit. Morbi fringilla urna vitae elit commodo, eu efficitur mi tristique.',
    'Mauris consequat risus quis erat malesuada convallis. Suspendisse potenti. Etiam ex eros, cursus id ex sed, varius aliquet leo. Morbi consectetur purus vel ligula viverra, non vestibulum libero lacinia. Phasellus ac elementum metus, vitae laoreet est. In cursus tellus mi, at mollis massa congue eu. Duis ultricies tincidunt velit nec euismod.',
    'Quisque bibendum blandit urna, a pretium metus porta pellentesque. Vivamus nec luctus dui, bibendum aliquam diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Praesent laoreet lorem nisl, at dignissim elit sagittis eu. Pellentesque dapibus sodales leo, eget imperdiet tellus lobortis et. Sed tincidunt massa orci, sed tempor ipsum sagittis nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed porttitor suscipit consequat. Praesent rhoncus lacus augue, eu feugiat lorem feugiat nec. Suspendisse id felis quis odio luctus molestie at eu massa. Donec fermentum risus vel tellus ullamcorper, eu commodo neque malesuada. Vestibulum pretium porttitor ultricies. Etiam in justo et velit viverra vulputate. Curabitur faucibus mauris sodales, volutpat nulla quis, vestibulum arcu. Praesent iaculis in quam in dignissim.',
    'Morbi viverra erat est, non ultrices turpis elementum sed. Suspendisse tincidunt blandit purus porta finibus. Nam id nunc vitae ipsum ultricies pellentesque. Duis fringilla sapien id risus condimentum consectetur. Suspendisse gravida rhoncus tellus vitae venenatis. Nunc viverra sem at vehicula ornare. Nulla vitae nulla nibh. Nam nec euismod dui. Sed eget sodales nisi. Cras non ultrices urna. Proin quis mauris euismod, commodo est mollis, faucibus erat. Praesent ullamcorper, diam vel posuere posuere, lacus dolor rhoncus mauris, sit amet tempus augue eros ut lacus. Fusce et libero erat. Proin ut urna nec nulla cursus mollis. Praesent et laoreet urna, eget accumsan nulla.',
    'Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper.'
  ][getRandomInt(0,5)];
}
function getTitle():string {
  const t:string[] = [
    'Evaluate dried fruit flavors',
    'Is this an example of wiggling?',
    'Survey about past and future desires',
    'Find a webm clip',
    'Evaluate a song',
    'Would you touch this?',
    'Find an example of the following phrases',
    'Take a survey on modern art',
    'Categorize the following image',
    'Extract images from webpage',
    'Create a multisyllabic rhyme',
    'Predict future lottery numbers'
  ];
  return t[getRandomInt(0,t.length-1)];
}
function generateName():string {
  const gn:Array<string> = ['Anna', 'Alice', 'Kracen', 'Ilya', 'Ian', 'Ishmael', 'Roslan', 'Aidan', 'Marlo', 'Blake', 'Wiggles', 'Michi', 'Reign', 'Dawn', 'Trigger', 'Kerek'];
  const sn:Array<string> = ['Kirsch', 'Rose', 'Lemmy', 'Reaper', 'Hazzar', 'Orion', 'Yang', 'Cassius', 'Kiqha', 'Liang', 'Necib', 'Miller', 'Vargas'];
  return `${gn[getRandomInt(0,gn.length-1)]} ${sn[getRandomInt(0,sn.length-1)]}`;
}
function hash(str:string):number {
  return str.split('')
    .map(v => v.charCodeAt(0))
    .reduce((a,b) => b + (a << 6) + (a << 16) - a, 0);
}
