
import dotenv from 'dotenv';
import School from '../../model/School';
import bcrypt from 'bcrypt';
import utils from '../../config/utils';
import { emailTemp } from '../../emailTemplate';
import encrypt from '../../middleware/encrypt';
import decrypt from '../../middleware/decrypt';



const sgMail = require('@sendgrid/mail')

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_KEY);

const addSchool = async (req, res) => {

    try {


        console.log(req.body)

        const { schoolName, schoolEmail, phoneNumber, country, contactPerson,
            contactPersonPhoneNumber, address, subDomain, state, logo } = req.body;

            
            let encr = encrypt(contactPersonPhoneNumber)
            let decrypted = decrypt(encr)




            if (!schoolName) {
                res.status(409).json({
                    status: 409,
                    success: false,
                    error: 'schoolName is required'
                })
                return;
            }


            if (!subDomain) {
                res.status(409).json({
                    status: 409,
                    success: false,
                    error: 'subDomain is required'
                })
                return;
            }

            if (!contactPersonPhoneNumber) {
                res.status(409).json({
                    status: 409,
                    success: false,
                    error: 'contactPersonPhoneNumber is required'
                })
                return;
            }


            

        if (!schoolEmail) {
            res.status(409).json({
                status: 409,
                success: false,
                error: 'School email is required'
            })
            return;
        }

        let school = await School.findOne({ schoolEmail });
        let chkName = await School.findOne({ schoolName });
        let sub = await School.findOne({ tenantId: subDomain });

        if (school) {
            res.status(409).json({
                status: 409,
                success: false,
                error: 'School already exist on the system'
            })
            return;
        }


        if (chkName) {
            res.status(409).json({
                status: 409,
                success: false,
                error: 'School Name already exist on the system'
            })
            return;
        }


        if (sub) {
            res.status(409).json({
                status: 409,
                success: false,
                error: 'Sub Domain already exist on the system'
            })
            return;
        }


        const token = utils.encodeToken("", false, schoolEmail);


        school = new School({

            schoolName, 
            schoolEmail, 
            // phoneNumber, 
            schoolLogo: req.file ? req.file.location : "", 
            country,
            contactPerson,
            invitationToken: token,
            tenantId: subDomain.toLowerCase(),
            contactPersonPhoneNumber,
            addresses: [
                {
                    campusAddress: address,
                    campusState: state,
                }
            ]
        
        });
   
        let data = `<div>
        <p style="padding: 32px 0; font-weight: 700; font-size: 20px;font-family: 'DM Sans';">
        Hi ${contactPerson},
        </p> 

        <p style="font-size: 16px;font-weight: 300;">

        Your school has been invited to the Nigenius SMS Platform.
        complete your registeration using this link
        <a href="http://${subDomain.toLowerCase()}.nigenius.ng/signup/?token=${token}&email=${schoolEmail}&firstName=${contactPerson}&tenantID=${subDomain}">Complete Setup</a>

        <br><br>
        </p>
        
        <div>`

       let resp = emailTemp(data, 'School Officially Added to Nigenius SMS Platform')


        const msg = {
            to: schoolEmail, // Change to your recipient
            subject: 'Invitation Notification',
            from: {
                email:'smsnebula@nigenius.ng',
                name: "Nigenius SMS"
            },
            html: `${resp}`
        }

        await school.save().then(() => {

            sgMail.send(msg)
            console.log('Email sent')
            res.status(200).json({
                status: 200,
                success: true,
                data: school
            })
        }).catch((err) => {
                console.error(err)
                res.status(400).json({
                    status: 400,
                    success: false,
                    error: err
                })
            })

        

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default addSchool;
