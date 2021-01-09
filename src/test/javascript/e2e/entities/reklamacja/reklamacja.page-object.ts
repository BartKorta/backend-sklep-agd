import { element, by, ElementFinder } from 'protractor';

export class ReklamacjaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-reklamacja div table .btn-danger'));
  title = element.all(by.css('jhi-reklamacja div h2#page-heading span')).first();
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

export class ReklamacjaUpdatePage {
  pageTitle = element(by.id('jhi-reklamacja-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  opisInput = element(by.id('field_opis'));

  zamowienieSelect = element(by.id('field_zamowienie'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setOpisInput(opis: string): Promise<void> {
    await this.opisInput.sendKeys(opis);
  }

  async getOpisInput(): Promise<string> {
    return await this.opisInput.getAttribute('value');
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

export class ReklamacjaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-reklamacja-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-reklamacja'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
