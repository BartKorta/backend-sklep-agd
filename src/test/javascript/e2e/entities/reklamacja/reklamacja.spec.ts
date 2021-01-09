import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ReklamacjaComponentsPage, ReklamacjaDeleteDialog, ReklamacjaUpdatePage } from './reklamacja.page-object';

const expect = chai.expect;

describe('Reklamacja e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let reklamacjaComponentsPage: ReklamacjaComponentsPage;
  let reklamacjaUpdatePage: ReklamacjaUpdatePage;
  let reklamacjaDeleteDialog: ReklamacjaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Reklamacjas', async () => {
    await navBarPage.goToEntity('reklamacja');
    reklamacjaComponentsPage = new ReklamacjaComponentsPage();
    await browser.wait(ec.visibilityOf(reklamacjaComponentsPage.title), 5000);
    expect(await reklamacjaComponentsPage.getTitle()).to.eq('Reklamacjas');
    await browser.wait(ec.or(ec.visibilityOf(reklamacjaComponentsPage.entities), ec.visibilityOf(reklamacjaComponentsPage.noResult)), 1000);
  });

  it('should load create Reklamacja page', async () => {
    await reklamacjaComponentsPage.clickOnCreateButton();
    reklamacjaUpdatePage = new ReklamacjaUpdatePage();
    expect(await reklamacjaUpdatePage.getPageTitle()).to.eq('Create or edit a Reklamacja');
    await reklamacjaUpdatePage.cancel();
  });

  it('should create and save Reklamacjas', async () => {
    const nbButtonsBeforeCreate = await reklamacjaComponentsPage.countDeleteButtons();

    await reklamacjaComponentsPage.clickOnCreateButton();

    await promise.all([reklamacjaUpdatePage.setOpisInput('opis'), reklamacjaUpdatePage.zamowienieSelectLastOption()]);

    expect(await reklamacjaUpdatePage.getOpisInput()).to.eq('opis', 'Expected Opis value to be equals to opis');

    await reklamacjaUpdatePage.save();
    expect(await reklamacjaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await reklamacjaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Reklamacja', async () => {
    const nbButtonsBeforeDelete = await reklamacjaComponentsPage.countDeleteButtons();
    await reklamacjaComponentsPage.clickOnLastDeleteButton();

    reklamacjaDeleteDialog = new ReklamacjaDeleteDialog();
    expect(await reklamacjaDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Reklamacja?');
    await reklamacjaDeleteDialog.clickOnConfirmButton();

    expect(await reklamacjaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
