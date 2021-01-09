import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProduktComponentsPage, ProduktDeleteDialog, ProduktUpdatePage } from './produkt.page-object';

const expect = chai.expect;

describe('Produkt e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let produktComponentsPage: ProduktComponentsPage;
  let produktUpdatePage: ProduktUpdatePage;
  let produktDeleteDialog: ProduktDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Produkts', async () => {
    await navBarPage.goToEntity('produkt');
    produktComponentsPage = new ProduktComponentsPage();
    await browser.wait(ec.visibilityOf(produktComponentsPage.title), 5000);
    expect(await produktComponentsPage.getTitle()).to.eq('Produkts');
    await browser.wait(ec.or(ec.visibilityOf(produktComponentsPage.entities), ec.visibilityOf(produktComponentsPage.noResult)), 1000);
  });

  it('should load create Produkt page', async () => {
    await produktComponentsPage.clickOnCreateButton();
    produktUpdatePage = new ProduktUpdatePage();
    expect(await produktUpdatePage.getPageTitle()).to.eq('Create or edit a Produkt');
    await produktUpdatePage.cancel();
  });

  it('should create and save Produkts', async () => {
    const nbButtonsBeforeCreate = await produktComponentsPage.countDeleteButtons();

    await produktComponentsPage.clickOnCreateButton();

    await promise.all([
      produktUpdatePage.setNazwaInput('nazwa'),
      produktUpdatePage.setCenaInput('5'),
      produktUpdatePage.setOpisInput('opis'),
      produktUpdatePage.setMocInput('moc'),
      produktUpdatePage.setDostepnoscInput('dostepnosc'),
      produktUpdatePage.setPojemnoscInput('pojemnosc'),
    ]);

    expect(await produktUpdatePage.getNazwaInput()).to.eq('nazwa', 'Expected Nazwa value to be equals to nazwa');
    expect(await produktUpdatePage.getCenaInput()).to.eq('5', 'Expected cena value to be equals to 5');
    expect(await produktUpdatePage.getOpisInput()).to.eq('opis', 'Expected Opis value to be equals to opis');
    expect(await produktUpdatePage.getMocInput()).to.eq('moc', 'Expected Moc value to be equals to moc');
    expect(await produktUpdatePage.getDostepnoscInput()).to.eq('dostepnosc', 'Expected Dostepnosc value to be equals to dostepnosc');
    expect(await produktUpdatePage.getPojemnoscInput()).to.eq('pojemnosc', 'Expected Pojemnosc value to be equals to pojemnosc');

    await produktUpdatePage.save();
    expect(await produktUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await produktComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Produkt', async () => {
    const nbButtonsBeforeDelete = await produktComponentsPage.countDeleteButtons();
    await produktComponentsPage.clickOnLastDeleteButton();

    produktDeleteDialog = new ProduktDeleteDialog();
    expect(await produktDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Produkt?');
    await produktDeleteDialog.clickOnConfirmButton();

    expect(await produktComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
