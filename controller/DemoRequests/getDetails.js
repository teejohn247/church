
import dotenv from 'dotenv';
import School from '../../model/School';
import bcrypt from 'bcrypt';

import DemoRequest from '../../model/DemoRequests';


dotenv.config();


const getDetails = async (req, res) => {

    try {

        let demo = await DemoRequest.findOne({ _id: req.params.id });

        if (!demo) {
            res.status(400).json({
                status: 400,
                error: 'Demo does not exist'
            })
            return;
        }


        res.status(201).json({
            status: 201,
            success: true,
            data: demo,
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default getDetails;
