import { element, by, ElementFinder } from 'protractor';

export class RaportComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-raport div table .btn-danger'));
  title = element.all(by.css('jhi-raport div h2#page-heading span')).first();
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

export class RaportUpdatePage {
  pageTitle = element(by.id('jhi-raport-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  opisInput = element(by.id('field_opis'));
  dataUtworzeniaInput = element(by.id('field_dataUtworzenia'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setOpisInput(opis: string): Promise<void> {
    await this.opisInput.sendKeys(opis);
  }

  async getOpisInput(): Promise<string> {
    return await this.opisInput.getAttribute('value');
  }

  async setDataUtworzeniaInput(dataUtworzenia: string): Promise<void> {
    await this.dataUtworzeniaInput.sendKeys(dataUtworzenia);
  }

  async getDataUtworzeniaInput(): Promise<string> {
    return await this.dataUtworzeniaInput.getAttribute('value');
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

export class RaportDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-raport-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-raport'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
