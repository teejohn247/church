
import dotenv from 'dotenv';
import Admin from '../../model/FirstTimers';
import bcrypt from 'bcrypt';
import utils from '../../config/utils';
import Cell from '../../model/Cell';
import Zone from '../../model/Zones';


dotenv.config();


const createFirstTimers = async (req, res) => {

    try {

        const { name, address, email, age_range, bad_comment, category,  education_level, gender, phone, prayer_request, date_of_birth
        , cell, zone } = req.body;

        let zones = await Zone.findOne({ _id: zone });
        let cells = await Cell.findOne({ _id: cell });



 
        if (!zones) {
            res.status(400).json({
                status: 400,
                error: 'Zone does not exist'
            })
            return;
        }

        if (!cells) {
            res.status(400).json({
                status: 400,
                error: 'Cell does not exist'
            })
            return;
        }


       let superAdmin = new Admin({
            name, 
            address, 
            email, 
            age_range, 
            bad_comment, 
            category,  
            education_level, 
            gender, 
            phone, 
            prayer_request, 
            date_of_birth,
            cell, 
            cell_name: cells.cell_name, 
            zone,
            zone_name: zones.zone_name
        });

        await superAdmin.save();



        res.status(201).json({
            status: 201,
            success: true,
            data: superAdmin
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default createFirstTimers;
