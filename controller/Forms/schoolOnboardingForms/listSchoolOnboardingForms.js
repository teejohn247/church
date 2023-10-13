
import dotenv from 'dotenv';
import Forms from '../../../model/SchoolOnboardingForm';



dotenv.config();


const listSchoolOnboardingForm = async (req, res) => {

    try {

        const { page, limit } = req.query;

        const form = await Forms.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

        const count = await Forms.find().countDocuments()



        if (!form) {
            res.status(400).json({
                status: 400,
                error: 'Form does not exist'
            })
            return;
        }

       
        res.status(200).json({
            status: 200,
            success: true,
            data: form,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })

    } catch (err) {
        res.status(500).json({
            status: 500,
            success: false,
            error: err
        })
    }
}
export default listSchoolOnboardingForm;
