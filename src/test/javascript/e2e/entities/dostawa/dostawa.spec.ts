import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DostawaComponentsPage, DostawaDeleteDialog, DostawaUpdatePage } from './dostawa.page-object';

const expect = chai.expect;

describe('Dostawa e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let dostawaComponentsPage: DostawaComponentsPage;
  let dostawaUpdatePage: DostawaUpdatePage;
  let dostawaDeleteDialog: DostawaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Dostawas', async () => {
    await navBarPage.goToEntity('dostawa');
    dostawaComponentsPage = new DostawaComponentsPage();
    await browser.wait(ec.visibilityOf(dostawaComponentsPage.title), 5000);
    expect(await dostawaComponentsPage.getTitle()).to.eq('Dostawas');
    await browser.wait(ec.or(ec.visibilityOf(dostawaComponentsPage.entities), ec.visibilityOf(dostawaComponentsPage.noResult)), 1000);
  });

  it('should load create Dostawa page', async () => {
    await dostawaComponentsPage.clickOnCreateButton();
    dostawaUpdatePage = new DostawaUpdatePage();
    expect(await dostawaUpdatePage.getPageTitle()).to.eq('Create or edit a Dostawa');
    await dostawaUpdatePage.cancel();
  });

  it('should create and save Dostawas', async () => {
    const nbButtonsBeforeCreate = await dostawaComponentsPage.countDeleteButtons();

    await dostawaComponentsPage.clickOnCreateButton();

    await promise.all([
      dostawaUpdatePage.setAdresInput('adres'),
      dostawaUpdatePage.setNumerKontaktowyInput('numerKontaktowy'),
      dostawaUpdatePage.setDataWysylkiInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      dostawaUpdatePage.setDostawcaInput('dostawca'),
      dostawaUpdatePage.zamowienieSelectLastOption(),
    ]);

    expect(await dostawaUpdatePage.getAdresInput()).to.eq('adres', 'Expected Adres value to be equals to adres');
    expect(await dostawaUpdatePage.getNumerKontaktowyInput()).to.eq(
      'numerKontaktowy',
      'Expected NumerKontaktowy value to be equals to numerKontaktowy'
    );
    expect(await dostawaUpdatePage.getDataWysylkiInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dataWysylki value to be equals to 2000-12-31'
    );
    expect(await dostawaUpdatePage.getDostawcaInput()).to.eq('dostawca', 'Expected Dostawca value to be equals to dostawca');

    await dostawaUpdatePage.save();
    expect(await dostawaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await dostawaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Dostawa', async () => {
    const nbButtonsBeforeDelete = await dostawaComponentsPage.countDeleteButtons();
    await dostawaComponentsPage.clickOnLastDeleteButton();

    dostawaDeleteDialog = new DostawaDeleteDialog();
    expect(await dostawaDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Dostawa?');
    await dostawaDeleteDialog.clickOnConfirmButton();

    expect(await dostawaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
