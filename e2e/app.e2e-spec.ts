import { AppTesetPagePage } from './app.po';

describe('app-teset-page App', () => {
  let page: AppTesetPagePage;

  beforeEach(() => {
    page = new AppTesetPagePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
