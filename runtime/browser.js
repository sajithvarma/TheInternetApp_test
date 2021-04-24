const ChromeDriver = require('./chromeDriver');
const {setWorldConstructor} = require("@cucumber/cucumber");
require("dotenv").config();
const browserName = process.env.BROWSER;

/**
 * create the selenium browser based on global var set in index.js
 * @returns {ThenableWebDriver} selenium web driver
 */
class CustomWorld
{
    constructor({attach,log,parameters}) {
        this.attach = attach;
        this.log = log;
        this.parameters = parameters;
        this.driver = this.init();
    }

     init()
    {
        let driver;
        switch (browserName) {
        case 'chrome':
            driver = new ChromeDriver();
            break;
        default:
            driver = null;
    }
    return driver;
    }

    quitBrowser()
    {
        this.driver.quit();
    }
}
setWorldConstructor(CustomWorld) ;
