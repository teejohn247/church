import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Debug from 'debug';


dotenv.config();
const debug = Debug('http');


dotenv.config();

module.exports = {

encodeToken: (id, isSuperAdmin, email) => {
const payload = { id, isSuperAdmin, email};
const option = { expiresIn: '10d' };
const secret = process.env.SECRET_KEY;
return jwt.sign(payload, secret, option);
    },
};


// module.exports = {

//     confirmationToken: (id, isSuperAdmin, email) => {
//     const payload = {email};
//     const option = { expiresIn: '1d' };
//     const secret = process.env.SECRET_KEY;
//     return jwt.sign(payload, secret, option);
//         },
//     };
    




