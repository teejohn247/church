// import crypto from 'crypto';
import dotenv from 'dotenv';

// const algorithm = 'aes-256-cbc'; //Using AES encryption
// const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);



var CryptoJS = require("crypto-js");


dotenv.config();
const decrypt = (encryptedText) => {
    try {
        
        let password =  process.env.CRYPTO_KEY
        var bytes  = CryptoJS.AES.decrypt(encryptedText, password);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;

    } catch (error) {
      console.log(error)
    }
  }

export default decrypt;