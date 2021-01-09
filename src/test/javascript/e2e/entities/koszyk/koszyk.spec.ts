import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { KoszykComponentsPage, KoszykDeleteDialog, KoszykUpdatePage } from './koszyk.page-object';

const expect = chai.expect;

describe('Koszyk e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let koszykComponentsPage: KoszykComponentsPage;
  let koszykUpdatePage: KoszykUpdatePage;
  let koszykDeleteDialog: KoszykDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Koszyks', async () => {
    await navBarPage.goToEntity('koszyk');
    koszykComponentsPage = new KoszykComponentsPage();
    await browser.wait(ec.visibilityOf(koszykComponentsPage.title), 5000);
    expect(await koszykComponentsPage.getTitle()).to.eq('Koszyks');
    await browser.wait(ec.or(ec.visibilityOf(koszykComponentsPage.entities), ec.visibilityOf(koszykComponentsPage.noResult)), 1000);
  });

  it('should load create Koszyk page', async () => {
    await koszykComponentsPage.clickOnCreateButton();
    koszykUpdatePage = new KoszykUpdatePage();
    expect(await koszykUpdatePage.getPageTitle()).to.eq('Create or edit a Koszyk');
    await koszykUpdatePage.cancel();
  });

  it('should create and save Koszyks', async () => {
    const nbButtonsBeforeCreate = await koszykComponentsPage.countDeleteButtons();

    await koszykComponentsPage.clickOnCreateButton();

    await promise.all([koszykUpdatePage.userSelectLastOption()]);

    await koszykUpdatePage.save();
    expect(await koszykUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await koszykComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Koszyk', async () => {
    const nbButtonsBeforeDelete = await koszykComponentsPage.countDeleteButtons();
    await koszykComponentsPage.clickOnLastDeleteButton();

    koszykDeleteDialog = new KoszykDeleteDialog();
    expect(await koszykDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Koszyk?');
    await koszykDeleteDialog.clickOnConfirmButton();

    expect(await koszykComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
