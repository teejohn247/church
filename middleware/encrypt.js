import crypto from 'crypto';
const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

var CryptoJS = require("crypto-js");

// Encrypt

const encrypt = (plainText) => {
    try {

        let password =  process.env.CRYPTO_KEY
        let ciphertext = CryptoJS.AES.encrypt(plainText, password).toString();
        return ciphertext;
  
    } catch (error) {
      console.log(error);
    }
  }

export default encrypt
