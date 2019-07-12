// tslint:disable-next-line: no-implicit-dependencies
import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo()
    .catch(() => {});
    expect(page.getTitleText())
      .toEqual('Welcome to web!')
      .catch(() => {});
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not
      // tslint:disable-next-line: no-object-literal-type-assertion
      .toContain(jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry));
  });
});
