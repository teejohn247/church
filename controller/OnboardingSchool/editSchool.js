
import dotenv from 'dotenv';
import School from '../../model/School';
import bcrypt from 'bcrypt';


import encrypt from '../../middleware/encrypt';

dotenv.config();


const editSchool = async (req, res) => {

    try {

        const { schoolName, schoolEmail, subDomain, phoneNumber, contactPerson, country, contactPersonPhoneNumber, numberOfCampuses, addresses } = req.body;


        let school = await School.findOne({ _id: req.params.id });

        if (!school) {
            res.status(400).json({
                status: 400,
                error: 'School does not exist'
            })
            return;
        }

    

        console.log(req.file)

        await school.updateOne({

            schoolName: schoolName && schoolName, 
            schoolEmail: schoolEmail && encrypt(schoolEmail), 
            phoneNumber: phoneNumber && phoneNumber, 
            country: country && country, 
            subDomain: subDomain && subDomain,
            numberOfCampuses:numberOfCampuses && numberOfCampuses , 
            addresses: addresses && addresses,
            contactPersonPhoneNumber:  encrypt(contactPersonPhoneNumber),
            contactPerson:  contactPerson,
            schoolLogo: req.file && req.file.location,  
        });


        await school.save();

        res.status(201).json({
            status: 201,
            success: true,
            data: "Update Successful",
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default editSchool;
