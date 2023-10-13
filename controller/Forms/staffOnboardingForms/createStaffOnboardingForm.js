
import dotenv from 'dotenv';
import Forms from '../../../model/StaffOnboardingForm';


dotenv.config();


const createStaffOnboardingForm = async (req, res) => {

    try {

        const { form_fields, form_name } = req.body;

        const check = await Forms.find({form_name: form_name})
    

        if (check.length > 0) {
            res.status(400).json({
                status: 400,
                error: 'Form already exists'
            })
            return;
        }

        let form = new Forms ({
            form_name,
            form_fields,
            created_by: req.payload.id
        })

        await form.save();

        res.status(200).json({
            status: 200,
            success: true,
            data: form
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default createStaffOnboardingForm;
