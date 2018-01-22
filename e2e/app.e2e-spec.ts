import { ExchangePage } from './app.po';

describe('exchange App', () => {
  let page: ExchangePage;

  beforeEach(() => {
    page = new ExchangePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
