import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PlatnoscComponentsPage, PlatnoscDeleteDialog, PlatnoscUpdatePage } from './platnosc.page-object';

const expect = chai.expect;

describe('Platnosc e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let platnoscComponentsPage: PlatnoscComponentsPage;
  let platnoscUpdatePage: PlatnoscUpdatePage;
  let platnoscDeleteDialog: PlatnoscDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Platnoscs', async () => {
    await navBarPage.goToEntity('platnosc');
    platnoscComponentsPage = new PlatnoscComponentsPage();
    await browser.wait(ec.visibilityOf(platnoscComponentsPage.title), 5000);
    expect(await platnoscComponentsPage.getTitle()).to.eq('Platnoscs');
    await browser.wait(ec.or(ec.visibilityOf(platnoscComponentsPage.entities), ec.visibilityOf(platnoscComponentsPage.noResult)), 1000);
  });

  it('should load create Platnosc page', async () => {
    await platnoscComponentsPage.clickOnCreateButton();
    platnoscUpdatePage = new PlatnoscUpdatePage();
    expect(await platnoscUpdatePage.getPageTitle()).to.eq('Create or edit a Platnosc');
    await platnoscUpdatePage.cancel();
  });

  it('should create and save Platnoscs', async () => {
    const nbButtonsBeforeCreate = await platnoscComponentsPage.countDeleteButtons();

    await platnoscComponentsPage.clickOnCreateButton();

    await promise.all([platnoscUpdatePage.setPosrednikInput('posrednik'), platnoscUpdatePage.zamowienieSelectLastOption()]);

    const selectedElektroniczna = platnoscUpdatePage.getElektronicznaInput();
    if (await selectedElektroniczna.isSelected()) {
      await platnoscUpdatePage.getElektronicznaInput().click();
      expect(await platnoscUpdatePage.getElektronicznaInput().isSelected(), 'Expected elektroniczna not to be selected').to.be.false;
    } else {
      await platnoscUpdatePage.getElektronicznaInput().click();
      expect(await platnoscUpdatePage.getElektronicznaInput().isSelected(), 'Expected elektroniczna to be selected').to.be.true;
    }
    expect(await platnoscUpdatePage.getPosrednikInput()).to.eq('posrednik', 'Expected Posrednik value to be equals to posrednik');

    await platnoscUpdatePage.save();
    expect(await platnoscUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await platnoscComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Platnosc', async () => {
    const nbButtonsBeforeDelete = await platnoscComponentsPage.countDeleteButtons();
    await platnoscComponentsPage.clickOnLastDeleteButton();

    platnoscDeleteDialog = new PlatnoscDeleteDialog();
    expect(await platnoscDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Platnosc?');
    await platnoscDeleteDialog.clickOnConfirmButton();

    expect(await platnoscComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
