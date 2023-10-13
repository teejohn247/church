
import dotenv from 'dotenv';
import Template from '../../model/DataOnboarding';
import School from '../../model/School';



dotenv.config();


const assignOnboarding = async (req, res) => {

    try {


        console.log('here')

        const { template_id } = req.params;
        const {  assigned_to } = req.body;

        const template = await Template.findOne({ _id: template_id });

        console.log(template)
      

        if (!template) {
            res.status(404).json({
                status: 404,
                error: 'This template does not exist'
            })
            return
        }

        if (template.enabled !== true) {
            res.status(400).json({
                status: 400,
                error: 'Template has been disabled.'
            })
            return;
        }

        let ids = [];
        let schoolData = [];


        assigned_to.map((assign, index) => {
            ids.push(assign.school_id)
        })

        let all_schools = await School.find({ _id: { $in : ids }})

        let check_sch = await School.find({ _id: { $in : ids }},
            { data_onboarding_template_assigned: { $elemMatch: { _id: template_id} } })

            if (check_sch.some((chk, i) => {
                chk.data_onboarding_template_assigned.length > 0
            })){
                res.status(400).json({
                    status: 400,
                    error: 'This Template has already been assigned to school'
                })
                return
            }

            all_schools.map((data, i) => {
                
                schoolData.push({school_id: data._id, school_name: data.schoolName, school_logo: data.schoolLogo})
            })

            // console.log("ll2", schoolData)



            let check_template = await Template.find({ _id: template_id },
                { assigned_to: { $elemMatch: { school_id: { $in : ids }}}})



            if (check_template[0].assigned_to.length > 0) {

                res.status(400).json({
                    status: 400,
                    error: 'This template has already been assigned to the school'
                })
                return
            }

        

        School.update({ _id: { $in : ids }}, { $push: { data_onboarding_template_assigned: { template_id: template_id, template_name: template.template_name, type: template.type, files: template.files, date_assigned: new Date()} } },
        {multi: true},
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
                Template.update({ _id: template_id }, { $push: { assigned_to: { $each: schoolData}} },

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
export default assignOnboarding;
