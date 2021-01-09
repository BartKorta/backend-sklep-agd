import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RaportComponentsPage, RaportDeleteDialog, RaportUpdatePage } from './raport.page-object';

const expect = chai.expect;

describe('Raport e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let raportComponentsPage: RaportComponentsPage;
  let raportUpdatePage: RaportUpdatePage;
  let raportDeleteDialog: RaportDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Raports', async () => {
    await navBarPage.goToEntity('raport');
    raportComponentsPage = new RaportComponentsPage();
    await browser.wait(ec.visibilityOf(raportComponentsPage.title), 5000);
    expect(await raportComponentsPage.getTitle()).to.eq('Raports');
    await browser.wait(ec.or(ec.visibilityOf(raportComponentsPage.entities), ec.visibilityOf(raportComponentsPage.noResult)), 1000);
  });

  it('should load create Raport page', async () => {
    await raportComponentsPage.clickOnCreateButton();
    raportUpdatePage = new RaportUpdatePage();
    expect(await raportUpdatePage.getPageTitle()).to.eq('Create or edit a Raport');
    await raportUpdatePage.cancel();
  });

  it('should create and save Raports', async () => {
    const nbButtonsBeforeCreate = await raportComponentsPage.countDeleteButtons();

    await raportComponentsPage.clickOnCreateButton();

    await promise.all([
      raportUpdatePage.setOpisInput('opis'),
      raportUpdatePage.setDataUtworzeniaInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
    ]);

    expect(await raportUpdatePage.getOpisInput()).to.eq('opis', 'Expected Opis value to be equals to opis');
    expect(await raportUpdatePage.getDataUtworzeniaInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dataUtworzenia value to be equals to 2000-12-31'
    );

    await raportUpdatePage.save();
    expect(await raportUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await raportComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Raport', async () => {
    const nbButtonsBeforeDelete = await raportComponentsPage.countDeleteButtons();
    await raportComponentsPage.clickOnLastDeleteButton();

    raportDeleteDialog = new RaportDeleteDialog();
    expect(await raportDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Raport?');
    await raportDeleteDialog.clickOnConfirmButton();

    expect(await raportComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
