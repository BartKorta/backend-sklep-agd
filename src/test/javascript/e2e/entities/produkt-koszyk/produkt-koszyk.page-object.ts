import { element, by, ElementFinder } from 'protractor';

export class ProduktKoszykComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-produkt-koszyk div table .btn-danger'));
  title = element.all(by.css('jhi-produkt-koszyk div h2#page-heading span')).first();
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

export class ProduktKoszykUpdatePage {
  pageTitle = element(by.id('jhi-produkt-koszyk-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  iloscInput = element(by.id('field_ilosc'));
  sumaInput = element(by.id('field_suma'));

  koszykSelect = element(by.id('field_koszyk'));
  produktSelect = element(by.id('field_produkt'));
  zamowienieSelect = element(by.id('field_zamowienie'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIloscInput(ilosc: string): Promise<void> {
    await this.iloscInput.sendKeys(ilosc);
  }

  async getIloscInput(): Promise<string> {
    return await this.iloscInput.getAttribute('value');
  }

  async setSumaInput(suma: string): Promise<void> {
    await this.sumaInput.sendKeys(suma);
  }

  async getSumaInput(): Promise<string> {
    return await this.sumaInput.getAttribute('value');
  }

  async koszykSelectLastOption(): Promise<void> {
    await this.koszykSelect.all(by.tagName('option')).last().click();
  }

  async koszykSelectOption(option: string): Promise<void> {
    await this.koszykSelect.sendKeys(option);
  }

  getKoszykSelect(): ElementFinder {
    return this.koszykSelect;
  }

  async getKoszykSelectedOption(): Promise<string> {
    return await this.koszykSelect.element(by.css('option:checked')).getText();
  }

  async produktSelectLastOption(): Promise<void> {
    await this.produktSelect.all(by.tagName('option')).last().click();
  }

  async produktSelectOption(option: string): Promise<void> {
    await this.produktSelect.sendKeys(option);
  }

  getProduktSelect(): ElementFinder {
    return this.produktSelect;
  }

  async getProduktSelectedOption(): Promise<string> {
    return await this.produktSelect.element(by.css('option:checked')).getText();
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

export class ProduktKoszykDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-produktKoszyk-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-produktKoszyk'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
