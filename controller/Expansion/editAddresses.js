
import dotenv from 'dotenv';
import School from '../../model/School';
import bcrypt from 'bcrypt';



dotenv.config();


const editAddress = async (req, res) => {

    try {

        const { addresses } = req.body;

        let school = await School.findOne({ _id: req.params.id });

        if (!school) {
            res.status(400).json({
                status: 400,
                error: 'School does not exist'
            })
            return;
        }

        await school.updateOne({
            addresses: addresses && addresses,
        });


        await school.save();

        res.status(200).json({
            status: 200,
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
export default editAddress;
