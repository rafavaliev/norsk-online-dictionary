import { element, by, ElementFinder } from 'protractor';

export default class NativeWordUpdatePage {
  pageTitle: ElementFinder = element(by.id('backendApp.nativeWord.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  wordInput: ElementFinder = element(by.css('input#native-word-word'));
  langSelect: ElementFinder = element(by.css('select#native-word-lang'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setWordInput(word) {
    await this.wordInput.sendKeys(word);
  }

  async getWordInput() {
    return this.wordInput.getAttribute('value');
  }

  async setLangSelect(lang) {
    await this.langSelect.sendKeys(lang);
  }

  async getLangSelect() {
    return this.langSelect.element(by.css('option:checked')).getText();
  }

  async langSelectLastOption() {
    await this.langSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
