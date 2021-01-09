import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ZamowienieRaportComponentsPage, ZamowienieRaportDeleteDialog, ZamowienieRaportUpdatePage } from './zamowienie-raport.page-object';

const expect = chai.expect;

describe('ZamowienieRaport e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let zamowienieRaportComponentsPage: ZamowienieRaportComponentsPage;
  let zamowienieRaportUpdatePage: ZamowienieRaportUpdatePage;
  let zamowienieRaportDeleteDialog: ZamowienieRaportDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ZamowienieRaports', async () => {
    await navBarPage.goToEntity('zamowienie-raport');
    zamowienieRaportComponentsPage = new ZamowienieRaportComponentsPage();
    await browser.wait(ec.visibilityOf(zamowienieRaportComponentsPage.title), 5000);
    expect(await zamowienieRaportComponentsPage.getTitle()).to.eq('Zamowienie Raports');
    await browser.wait(
      ec.or(ec.visibilityOf(zamowienieRaportComponentsPage.entities), ec.visibilityOf(zamowienieRaportComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ZamowienieRaport page', async () => {
    await zamowienieRaportComponentsPage.clickOnCreateButton();
    zamowienieRaportUpdatePage = new ZamowienieRaportUpdatePage();
    expect(await zamowienieRaportUpdatePage.getPageTitle()).to.eq('Create or edit a Zamowienie Raport');
    await zamowienieRaportUpdatePage.cancel();
  });

  it('should create and save ZamowienieRaports', async () => {
    const nbButtonsBeforeCreate = await zamowienieRaportComponentsPage.countDeleteButtons();

    await zamowienieRaportComponentsPage.clickOnCreateButton();

    await promise.all([zamowienieRaportUpdatePage.raportSelectLastOption(), zamowienieRaportUpdatePage.zamowienieSelectLastOption()]);

    await zamowienieRaportUpdatePage.save();
    expect(await zamowienieRaportUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await zamowienieRaportComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ZamowienieRaport', async () => {
    const nbButtonsBeforeDelete = await zamowienieRaportComponentsPage.countDeleteButtons();
    await zamowienieRaportComponentsPage.clickOnLastDeleteButton();

    zamowienieRaportDeleteDialog = new ZamowienieRaportDeleteDialog();
    expect(await zamowienieRaportDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Zamowienie Raport?');
    await zamowienieRaportDeleteDialog.clickOnConfirmButton();

    expect(await zamowienieRaportComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
