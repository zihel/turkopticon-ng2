import { TurkopticonNg2Page } from './app.po';

describe('turkopticon-ng2 App', function() {
  let page: TurkopticonNg2Page;

  beforeEach(() => {
    page = new TurkopticonNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
