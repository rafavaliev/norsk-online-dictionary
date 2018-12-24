/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import NativeWordComponentsPage from './native-word.page-object';
import { NativeWordDeleteDialog } from './native-word.page-object';
import NativeWordUpdatePage from './native-word-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('NativeWord e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let nativeWordUpdatePage: NativeWordUpdatePage;
  let nativeWordComponentsPage: NativeWordComponentsPage;
  let nativeWordDeleteDialog: NativeWordDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();

    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load NativeWords', async () => {
    await navBarPage.getEntityPage('native-word');
    nativeWordComponentsPage = new NativeWordComponentsPage();
    expect(await nativeWordComponentsPage.getTitle().getText()).to.match(/Native Words/);
  });

  it('should load create NativeWord page', async () => {
    await nativeWordComponentsPage.clickOnCreateButton();
    nativeWordUpdatePage = new NativeWordUpdatePage();
    expect(await nativeWordUpdatePage.getPageTitle().getAttribute('id')).to.match(/backendApp.nativeWord.home.createOrEditLabel/);
  });

  it('should create and save NativeWords', async () => {
    const nbButtonsBeforeCreate = await nativeWordComponentsPage.countDeleteButtons();

    await nativeWordUpdatePage.setWordInput('word');
    expect(await nativeWordUpdatePage.getWordInput()).to.match(/word/);
    await nativeWordUpdatePage.langSelectLastOption();
    await waitUntilDisplayed(nativeWordUpdatePage.getSaveButton());
    await nativeWordUpdatePage.save();
    await waitUntilHidden(nativeWordUpdatePage.getSaveButton());
    expect(await nativeWordUpdatePage.getSaveButton().isPresent()).to.be.false;

    await nativeWordComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await nativeWordComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last NativeWord', async () => {
    await nativeWordComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await nativeWordComponentsPage.countDeleteButtons();
    await nativeWordComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    nativeWordDeleteDialog = new NativeWordDeleteDialog();
    expect(await nativeWordDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/backendApp.nativeWord.delete.question/);
    await nativeWordDeleteDialog.clickOnConfirmButton();

    await nativeWordComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await nativeWordComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
