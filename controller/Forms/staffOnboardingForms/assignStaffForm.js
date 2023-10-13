
import dotenv from 'dotenv';
import Forms from '../../../model/StaffOnboardingForm';
import School from '../../../model/School';



dotenv.config();


const assignStaffForm = async (req, res) => {

    try {

        const { form_id, school_id } = req.params;

        const school = await School.findOne({ _id: school_id });
        const form = await Forms.findOne({ _id: form_id });

        if (!school) {
            res.status(404).json({
                status: 404,
                error: 'This school does not exist'
            })
            return
        }

        if (!form) {
            res.status(404).json({
                status: 404,
                error: 'This form does not exist'
            })
            return
        }

        // check if this form has already been assigned to school

        let check_school = await School.find({ _id: school_id },
            { school_onboarding_form_assigned: { $elemMatch: { form_id: form_id } } })

        // check if this school has been assigned this form



            let check_form = await Forms.find({ _id: form_id },
                { assigned_to: { $elemMatch: { school_id: school_id } } })


        
        if (check_school[0].school_onboarding_form_assigned.length > 0) {
            res.status(400).json({
                status: 400,
                error: 'This school has already been assigned form'
            })
            return
        }

        if (check_form[0].assigned_to.length > 0) {

            res.status(400).json({
                status: 400,
                error: 'This form has already been assigned to the school'
            })
            return
        }


        School.findOneAndUpdate({ _id: school_id }, { $push: { staffs_onboarding_form_assigned: { form_id: form_id, form_name: form.form_name, date_assigned: new Date()} } },
        { upsert: true, new: true },
        function (
            err,
            result
        ) {
            if (err) {
                res.status(401).json({
                    status: 401,
                    success: false,
                    error: err

                })

            } else {
                Forms.findOneAndUpdate({ _id: form_id }, { $push: { assigned_to: { school_id: school_id, school_name: school.school_name, date_assigned: new Date() } } },

                    { upsert: true, new: true },
                    function (
                        err,
                        result
                    ) {
                        if (err) {
                            res.status(401).json({
                                status: 401,
                                success: false,
                                error: err

                            })

                        }
                        else {

                            res.status(200).json({
                                status: 200,
                                success: true,
                                data: result
                            })
                           
                        }
                    })

            }
        })


    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default assignStaffForm;
