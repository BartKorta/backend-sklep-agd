import { element, by, ElementFinder } from 'protractor';

export class PlatnoscComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-platnosc div table .btn-danger'));
  title = element.all(by.css('jhi-platnosc div h2#page-heading span')).first();
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

export class PlatnoscUpdatePage {
  pageTitle = element(by.id('jhi-platnosc-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  elektronicznaInput = element(by.id('field_elektroniczna'));
  posrednikInput = element(by.id('field_posrednik'));

  zamowienieSelect = element(by.id('field_zamowienie'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  getElektronicznaInput(): ElementFinder {
    return this.elektronicznaInput;
  }

  async setPosrednikInput(posrednik: string): Promise<void> {
    await this.posrednikInput.sendKeys(posrednik);
  }

  async getPosrednikInput(): Promise<string> {
    return await this.posrednikInput.getAttribute('value');
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

export class PlatnoscDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-platnosc-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-platnosc'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
