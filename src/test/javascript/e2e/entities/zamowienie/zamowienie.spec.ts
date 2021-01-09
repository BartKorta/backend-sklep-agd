import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ZamowienieComponentsPage, ZamowienieDeleteDialog, ZamowienieUpdatePage } from './zamowienie.page-object';

const expect = chai.expect;

describe('Zamowienie e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let zamowienieComponentsPage: ZamowienieComponentsPage;
  let zamowienieUpdatePage: ZamowienieUpdatePage;
  let zamowienieDeleteDialog: ZamowienieDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Zamowienies', async () => {
    await navBarPage.goToEntity('zamowienie');
    zamowienieComponentsPage = new ZamowienieComponentsPage();
    await browser.wait(ec.visibilityOf(zamowienieComponentsPage.title), 5000);
    expect(await zamowienieComponentsPage.getTitle()).to.eq('Zamowienies');
    await browser.wait(ec.or(ec.visibilityOf(zamowienieComponentsPage.entities), ec.visibilityOf(zamowienieComponentsPage.noResult)), 1000);
  });

  it('should load create Zamowienie page', async () => {
    await zamowienieComponentsPage.clickOnCreateButton();
    zamowienieUpdatePage = new ZamowienieUpdatePage();
    expect(await zamowienieUpdatePage.getPageTitle()).to.eq('Create or edit a Zamowienie');
    await zamowienieUpdatePage.cancel();
  });

  it('should create and save Zamowienies', async () => {
    const nbButtonsBeforeCreate = await zamowienieComponentsPage.countDeleteButtons();

    await zamowienieComponentsPage.clickOnCreateButton();

    await promise.all([
      zamowienieUpdatePage.setSumaInput('5'),
      zamowienieUpdatePage.setDataZamowieniaInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      zamowienieUpdatePage.userSelectLastOption(),
    ]);

    expect(await zamowienieUpdatePage.getSumaInput()).to.eq('5', 'Expected suma value to be equals to 5');
    expect(await zamowienieUpdatePage.getDataZamowieniaInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dataZamowienia value to be equals to 2000-12-31'
    );

    await zamowienieUpdatePage.save();
    expect(await zamowienieUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await zamowienieComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Zamowienie', async () => {
    const nbButtonsBeforeDelete = await zamowienieComponentsPage.countDeleteButtons();
    await zamowienieComponentsPage.clickOnLastDeleteButton();

    zamowienieDeleteDialog = new ZamowienieDeleteDialog();
    expect(await zamowienieDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Zamowienie?');
    await zamowienieDeleteDialog.clickOnConfirmButton();

    expect(await zamowienieComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
