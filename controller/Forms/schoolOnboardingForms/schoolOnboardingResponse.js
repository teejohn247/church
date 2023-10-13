
import dotenv from 'dotenv';
import Forms from '../../../model/SchoolOnboardingForm';
import OnboardingData from '../../../model/OnboardingData';
import School from '../../../model/School';



dotenv.config();


const schoolOnboardingResponse = async (req, res) => {

    try {

        const { form_fields, form_id, school_id } = req.body;
        const check_form = await Forms.find({_id: form_id})

        if (!check_form ) {
            res.status(400).json({
                status: 400,
                error: 'Form does not exist'
            })
            return;
        }

        let check_school = await School.find({ _id: school_id },
            {  school_onboarding_form_assigned: { $elemMatch: { form_id: form_id } } })

            if (!check_school ) {
                res.status(400).json({
                    status: 400,
                    error: 'Form was not assigned to school'
                })
                return;
            }


        // check if the respone keys and the database keys are same

        let db_form_fields = []

        check_form[0].form_fields.map((a,i) => {
            db_form_fields.push(a.field_title)
        })

       

       const response_form_fields = Object.keys(form_fields[0])

       if(db_form_fields.toString() !== response_form_fields.toString()){
        res.status(400).json({
            status: 400,
            error: 'Some keys in the form fields are missing'
        })
        return;
       }

        let response = new OnboardingData({
            form_id,
            form_name: check_form[0].form_name,
            form_fields : form_fields[0],
            answered_by: req.payload.id
        })
        

        await response.save();

        res.status(200).json({
            status: 200,
            success: true,
            data:response
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default schoolOnboardingResponse;
