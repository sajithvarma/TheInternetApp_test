'use strict'
const crypto = require('crypto');
const yargs = require('yargs');
const encryptionalgorithm = 'aes-256-cbc';
const ivlength = 16;
const key = crypto.randomBytes(32);

yargs.command({
    command:'encrypt',
    describe: 'encrypt the given text',
    builder:{
        text:
            {describe : "The text to encrypt",
              demandOption:true,
                type:'string'
            }
    },
    handler(argv)
    {
        console.log("Encrypted text. Copy this value into the env file");
        console.log(encrypt(argv.text))
    }

})

yargs.command({
    command:'decrypt',
    describe: 'decrypt the given text',
    builder:{
        text:
            {describe : "The text to decrypt",
                demandOption:true,
                type:'string'
            }
    },
    handler(argv)
    {
        console.log("decrypting..");
        console.log(decrypt(argv.text))
    }

})


yargs.parse();

function encrypt(text)
{
    const iv = crypto.randomBytes(ivlength);
    const cipher = crypto.createCipheriv(encryptionalgorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted,cipher.final()]);
    let encrypteddata =  iv.toString('hex')+ key.toString('hex')+encrypted.toString('hex') ;
    return encrypteddata;
}

function decrypt(text)
{
    let iv = Buffer.from(text.substring(0,32),'hex')
    let keyvalue = Buffer.from(text.substring(32,96),'hex');
    let encryptedtext = Buffer.from(text.substring(96,text.length),'hex');
    let decipher = crypto.createDecipheriv(encryptionalgorithm,keyvalue,iv);
    let decrypted = decipher.update(encryptedtext);
    decrypted=Buffer.concat([decrypted,decipher.final()]);
    return(decrypted.toString())
}
module.exports.encryptor = {decrypt,encrypt}