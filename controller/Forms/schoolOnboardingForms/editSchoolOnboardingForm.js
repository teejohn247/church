
import dotenv from 'dotenv';
import Forms from '../../../model/SchoolOnboardingForm';
import School from '../../../model/School';

dotenv.config();


const editSchoolOnboardingForm = async (req, res) => {

    try {

        const { sections, header, footer, form_name  } = req.body;

        const form = await Forms.find({ _id: req.params.id })

        if (!form) {
            res.status(400).json({
                status: 400,
                error: 'Form does not exist'
            })
            return;
        }


        let ids = []
        console.log(form[0])

        console.log(form[0].assigned_to)


        form[0].assigned_to && form[0].assigned_to.map((assign, index) => {
                ids.push(assign.school_id)
            })


        if (form[0].assigned_to.length > 0) {
            School.update({ _id: { $in: ids } },
                {
                    $set:
                    {
                        "school_onboarding_form_assigned.$[i].form_name": form_name && form_name,
                        "school_onboarding_form_assigned.$[i].header": header && header,
                        "school_onboarding_form_assigned.$[i].footer": footer && footer,
                        "school_onboarding_form_assigned.$[i].sections": sections && sections,


                    }

                }, {
                arrayFilters: [
                    {
                        "i.form_id": req.params.id
                    }
                ]
            },
                function (
                    err,
                    result
                ) {
                    if (err) {
                        console.log('here')
                        res.status(401).json({
                            status: 401,
                            success: false,
                            error: err

                        })
                     return;
                    } else {


                      
                    }

                 
                })
                await form[0].update({
                    form_name: form_name && form_name,
                    header: header && header,
                    footer: footer && footer,
                    sections: sections && sections

                })
                res.status(200).json({
                    status: 200,
                    success: true,
                    data: result
                })
        } else {
        

            console.log({form_name})
          await form[0].update({
                form_name: form_name && form_name,
                header: header && header,
                footer: footer && footer,
                sections: sections && sections

            })

            res.status(200).json({
                status: 200,
                success: true,
                data: "Update Successful"
            })
        }





    } catch (err) {
        res.status(500).json({
            status: 500,
            success: false,
            error: err
        })
    }
}
export default editSchoolOnboardingForm;
