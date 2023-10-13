
import dotenv from 'dotenv';
import Forms from '../../../model/SchoolOnboardingForm';



dotenv.config();


const viewSchoolOnboardingForm = async (req, res) => {

    try {
       
        const form = await Forms.find({_id: req.params.id})

        if (form.length < 1) {
            res.status(400).json({
                status: 400,
                error: 'Form does not exist'
            })
            return;
        }

       
        res.status(200).json({
            status: 200,
            success: true,
            data: form
        })

    } catch (err) {
        res.status(500).json({
            status: 500,
            success: false,
            error: err
        })
    }
}
export default viewSchoolOnboardingForm;
