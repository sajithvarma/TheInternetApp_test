const {By}=require('selenium-webdriver');
module.exports={
    url: 'https://the-internet.herokuapp.com/login',

    elements: {
        usernameInput: By.id('username'),
        passwordInput: By.id('password'),
        submitButton:By.xpath(`//*[@id="login"]/button`),
        secureArea:By.xpath(`//*[@id="flash"]`),
        secureAreaText:`You logged into a secure area!\n×`
    }
}




