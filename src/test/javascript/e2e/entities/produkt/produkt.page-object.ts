import { element, by, ElementFinder } from 'protractor';

export class ProduktComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-produkt div table .btn-danger'));
  title = element.all(by.css('jhi-produkt div h2#page-heading span')).first();
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

export class ProduktUpdatePage {
  pageTitle = element(by.id('jhi-produkt-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nazwaInput = element(by.id('field_nazwa'));
  cenaInput = element(by.id('field_cena'));
  opisInput = element(by.id('field_opis'));
  mocInput = element(by.id('field_moc'));
  dostepnoscInput = element(by.id('field_dostepnosc'));
  pojemnoscInput = element(by.id('field_pojemnosc'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setNazwaInput(nazwa: string): Promise<void> {
    await this.nazwaInput.sendKeys(nazwa);
  }

  async getNazwaInput(): Promise<string> {
    return await this.nazwaInput.getAttribute('value');
  }

  async setCenaInput(cena: string): Promise<void> {
    await this.cenaInput.sendKeys(cena);
  }

  async getCenaInput(): Promise<string> {
    return await this.cenaInput.getAttribute('value');
  }

  async setOpisInput(opis: string): Promise<void> {
    await this.opisInput.sendKeys(opis);
  }

  async getOpisInput(): Promise<string> {
    return await this.opisInput.getAttribute('value');
  }

  async setMocInput(moc: string): Promise<void> {
    await this.mocInput.sendKeys(moc);
  }

  async getMocInput(): Promise<string> {
    return await this.mocInput.getAttribute('value');
  }

  async setDostepnoscInput(dostepnosc: string): Promise<void> {
    await this.dostepnoscInput.sendKeys(dostepnosc);
  }

  async getDostepnoscInput(): Promise<string> {
    return await this.dostepnoscInput.getAttribute('value');
  }

  async setPojemnoscInput(pojemnosc: string): Promise<void> {
    await this.pojemnoscInput.sendKeys(pojemnosc);
  }

  async getPojemnoscInput(): Promise<string> {
    return await this.pojemnoscInput.getAttribute('value');
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

export class ProduktDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-produkt-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-produkt'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
