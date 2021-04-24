'use strict'
require("../../runtime/browser");
const encryptor=require("../../encrypt").encryptor
const {Given,When,Then, After,Status,Before} = require("@cucumber/cucumber");
const assert = require("assert");
const loginPage= require('../page_objects/loginPage');
const dayjs = require("dayjs");

Before(async function () {
    await this.driver.get(process.env.URL);
});

Given('The login page with title {string} is open', async function (title) {
    let actual = await this.driver.getTitle();
    assert.strictEqual(actual,title,"Failed to load internet page");
});
Given('I enter user credentials', async function () {
  let input_username = await this.driver.findElement(loginPage.elements["usernameInput"]);
  let input_password = await this.driver.findElement(loginPage.elements["passwordInput"]);
    await input_username.sendKeys(process.env.USERNAME);
    await input_password.sendKeys(encryptor.decrypt(process.env.PASSWORD));
   assert.strictEqual(await input_username.getAttribute('value'),process.env.USERNAME,"Username is invalid");
   assert.strictEqual(await input_password.getAttribute('value'),encryptor.decrypt(process.env.PASSWORD),"Password is invalid");
});
When('I click the Login button', async function () {
    let currentPageUrl = await this.driver.getCurrentUrl();
    await this.driver.findElement(loginPage.elements["submitButton"]).click();
    let newPageUrl = await this.driver.getCurrentUrl();
    assert.notStrictEqual(newPageUrl,currentPageUrl,"Login Failed");
});
Then('the Secure Area Page is opened', async function () {
    let today = new Date().toISOString();
    console.log(today);
let time = '17:00'
    console.log(time.slice(0,2));
    console.log(time.slice(3,5));
  //dayjs.extend(customParseFormat)
    //console.log(dayjs("12-25-1995", "MM-DD-YYYY"));
    console.log(dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ssZ'));
  //  dayjs().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A')
    let offset = new Date().getUTCDate();
    console.log(offset);
        /*let newdT = new Date(today).toDateString();
    console.log(newdT);
    let day = newdT.slice(0,3);
    let dt = newdT.slice(4,newdT.length-5);
    let fromDate = (day+', '+dt+ ' ' +'09:00');
    let toDate = (day+', '+dt+ ' ' +'17:00');
    let formatteddate = fromDate + ' - '+toDate;
    console.log(formatteddate);*/
    let secureareatext = await this.driver.findElement(loginPage.elements["secureArea"]).getText();
    assert.strictEqual(secureareatext,loginPage.elements["secureAreaText"],"Secure Area not loaded correctly");
});

After(async function (testCase) {
    let world = this;

    if(testCase.result.status===Status.FAILED) {
        await this.driver.takeScreenshot().then(function (buffer) {
            return world.attach(buffer, 'image/png');
        });
    }
   await this.quitBrowser();
});

