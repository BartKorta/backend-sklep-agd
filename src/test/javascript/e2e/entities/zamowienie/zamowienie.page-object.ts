import { element, by, ElementFinder } from 'protractor';

export class ZamowienieComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-zamowienie div table .btn-danger'));
  title = element.all(by.css('jhi-zamowienie div h2#page-heading span')).first();
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

export class ZamowienieUpdatePage {
  pageTitle = element(by.id('jhi-zamowienie-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  sumaInput = element(by.id('field_suma'));
  dataZamowieniaInput = element(by.id('field_dataZamowienia'));

  userSelect = element(by.id('field_user'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setSumaInput(suma: string): Promise<void> {
    await this.sumaInput.sendKeys(suma);
  }

  async getSumaInput(): Promise<string> {
    return await this.sumaInput.getAttribute('value');
  }

  async setDataZamowieniaInput(dataZamowienia: string): Promise<void> {
    await this.dataZamowieniaInput.sendKeys(dataZamowienia);
  }

  async getDataZamowieniaInput(): Promise<string> {
    return await this.dataZamowieniaInput.getAttribute('value');
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
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

export class ZamowienieDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-zamowienie-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-zamowienie'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
