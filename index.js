'use strict'
const Cucumber = require("@cucumber/cucumber");
const dotenv= require("dotenv");
dotenv.config();
const env = process.env.ENVIRONMENT;

if(env!==null)
{
    const environments = '.env.'+ env ;
    dotenv.config({path:environments})
}

new Cucumber.Cli({
    argv: process.argv,
    cwd: process.cwd(),
    stdout: process.stdout
}).run()
