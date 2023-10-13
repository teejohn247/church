
import dotenv from 'dotenv';
import Forms from '../../../model/StaffOnboardingForm';


dotenv.config();


const editStaffOnboardingForm = async (req, res) => {

    try {

        const { form_fields, form_name } = req.body;

        const form = await Forms.find({_id: req.params.id})

        if (!form) {
            res.status(400).json({
                status: 400,
                error: 'Form does not exist'
            })
            return;
        }

        if (form[0].created_by !== req.payload.id) {
            res.status(400).json({
                status: 400,
                error: 'Access denied'
            })
            return;
        }

        await form[0].updateOne({
            form_name: form_name ? form_name : form[0].form_name,
            form_fields: form_fields ? form_fields : form[0].form_fields,
        }, form)

       
        res.status(200).json({
            status: 200,
            success: true,
            data: "Update Successful"
        })

    } catch (err) {
        res.status(500).json({
            status: 500,
            success: false,
            error: err
        })
    }
}
export default editStaffOnboardingForm;
