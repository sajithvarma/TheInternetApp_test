require("dotenv").config;

module.exports = {
    environment: process.env.ENVIRONMENT,
    browser: process.env.BROWSER,
    url:process.env.URL,
    username:process.env.USERNAME,
    password:process.env.PASSWORD,
}


