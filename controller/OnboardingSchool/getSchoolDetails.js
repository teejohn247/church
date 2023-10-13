
import dotenv from 'dotenv';
import School from '../../model/School';
import bcrypt from 'bcrypt';



dotenv.config();


const getSchoolDetails = async (req, res) => {

    try {



        let school = await School.findOne({ _id: req.params.id });

        if (!school) {
            res.status(400).json({
                status: 400,
                error: 'School does not exist'
            })
            return;
        }


        res.status(201).json({
            status: 201,
            success: true,
            data: school,
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default getSchoolDetails;
