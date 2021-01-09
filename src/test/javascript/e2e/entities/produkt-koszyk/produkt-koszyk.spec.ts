import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProduktKoszykComponentsPage, ProduktKoszykDeleteDialog, ProduktKoszykUpdatePage } from './produkt-koszyk.page-object';

const expect = chai.expect;

describe('ProduktKoszyk e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let produktKoszykComponentsPage: ProduktKoszykComponentsPage;
  let produktKoszykUpdatePage: ProduktKoszykUpdatePage;
  let produktKoszykDeleteDialog: ProduktKoszykDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProduktKoszyks', async () => {
    await navBarPage.goToEntity('produkt-koszyk');
    produktKoszykComponentsPage = new ProduktKoszykComponentsPage();
    await browser.wait(ec.visibilityOf(produktKoszykComponentsPage.title), 5000);
    expect(await produktKoszykComponentsPage.getTitle()).to.eq('Produkt Koszyks');
    await browser.wait(
      ec.or(ec.visibilityOf(produktKoszykComponentsPage.entities), ec.visibilityOf(produktKoszykComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ProduktKoszyk page', async () => {
    await produktKoszykComponentsPage.clickOnCreateButton();
    produktKoszykUpdatePage = new ProduktKoszykUpdatePage();
    expect(await produktKoszykUpdatePage.getPageTitle()).to.eq('Create or edit a Produkt Koszyk');
    await produktKoszykUpdatePage.cancel();
  });

  it('should create and save ProduktKoszyks', async () => {
    const nbButtonsBeforeCreate = await produktKoszykComponentsPage.countDeleteButtons();

    await produktKoszykComponentsPage.clickOnCreateButton();

    await promise.all([
      produktKoszykUpdatePage.setIloscInput('5'),
      produktKoszykUpdatePage.setSumaInput('5'),
      produktKoszykUpdatePage.koszykSelectLastOption(),
      produktKoszykUpdatePage.produktSelectLastOption(),
      produktKoszykUpdatePage.zamowienieSelectLastOption(),
    ]);

    expect(await produktKoszykUpdatePage.getIloscInput()).to.eq('5', 'Expected ilosc value to be equals to 5');
    expect(await produktKoszykUpdatePage.getSumaInput()).to.eq('5', 'Expected suma value to be equals to 5');

    await produktKoszykUpdatePage.save();
    expect(await produktKoszykUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await produktKoszykComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ProduktKoszyk', async () => {
    const nbButtonsBeforeDelete = await produktKoszykComponentsPage.countDeleteButtons();
    await produktKoszykComponentsPage.clickOnLastDeleteButton();

    produktKoszykDeleteDialog = new ProduktKoszykDeleteDialog();
    expect(await produktKoszykDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Produkt Koszyk?');
    await produktKoszykDeleteDialog.clickOnConfirmButton();

    expect(await produktKoszykComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
