import { element, by, ElementFinder } from 'protractor';

export class DostawaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-dostawa div table .btn-danger'));
  title = element.all(by.css('jhi-dostawa div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class DostawaUpdatePage {
  pageTitle = element(by.id('jhi-dostawa-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  adresInput = element(by.id('field_adres'));
  numerKontaktowyInput = element(by.id('field_numerKontaktowy'));
  dataWysylkiInput = element(by.id('field_dataWysylki'));
  dostawcaInput = element(by.id('field_dostawca'));

  zamowienieSelect = element(by.id('field_zamowienie'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setAdresInput(adres: string): Promise<void> {
    await this.adresInput.sendKeys(adres);
  }

  async getAdresInput(): Promise<string> {
    return await this.adresInput.getAttribute('value');
  }

  async setNumerKontaktowyInput(numerKontaktowy: string): Promise<void> {
    await this.numerKontaktowyInput.sendKeys(numerKontaktowy);
  }

  async getNumerKontaktowyInput(): Promise<string> {
    return await this.numerKontaktowyInput.getAttribute('value');
  }

  async setDataWysylkiInput(dataWysylki: string): Promise<void> {
    await this.dataWysylkiInput.sendKeys(dataWysylki);
  }

  async getDataWysylkiInput(): Promise<string> {
    return await this.dataWysylkiInput.getAttribute('value');
  }

  async setDostawcaInput(dostawca: string): Promise<void> {
    await this.dostawcaInput.sendKeys(dostawca);
  }

  async getDostawcaInput(): Promise<string> {
    return await this.dostawcaInput.getAttribute('value');
  }

  async zamowienieSelectLastOption(): Promise<void> {
    await this.zamowienieSelect.all(by.tagName('option')).last().click();
  }

  async zamowienieSelectOption(option: string): Promise<void> {
    await this.zamowienieSelect.sendKeys(option);
  }

  getZamowienieSelect(): ElementFinder {
    return this.zamowienieSelect;
  }

  async getZamowienieSelectedOption(): Promise<string> {
    return await this.zamowienieSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class DostawaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-dostawa-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-dostawa'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
