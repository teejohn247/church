import dotenv from 'dotenv';
import Template from '../../model/DataOnboarding';
import School from '../../model/School';



dotenv.config();


const dataOnboarding = async (req, res) => {

    try {

        const { template_name, files, bulk_upload, assigned_to, type } = req.body;
        

        let ids = [];


        assigned_to.map((assign, index) => {
            ids.push(assign.school_id)
        })

        let check_sch = await School.find({ _id: { $in : ids }},
            { data_onboarding_template_assigned: { $elemMatch: { template_name: template_name } } })

            if (check_sch.some((chk, i) => {
                chk.data_onboarding_template_assigned.length > 0
            })){
                res.status(400).json({
                    status: 400,
                    error: 'This Template has already been assigned to school'
                })
                return
            }


        const check = await Template.find({template_name: template_name})

        if (check.length > 0) {
            res.status(400).json({
                status: 400,
                error: 'Name already exist'
            })
            return;
        }


        let files_data = [];

        console.log(req.files.length)

        if(req.files.length > 0){

            req.files.map((data, index) => {
                files_data.push({file_name: data.originalname, file_path: data.location})
            })
           
        }

        await School.find({ _id: { $in : ids }})

        let template = new Template ({
            template_name, 
            files: files_data.length > 0 ? files_data : [], 
            assigned_to,
            bulk_upload,
            type,
            created_by: req.payload.id
        })


        await template.save();

        School.update({ _id: { $in : ids }}, { $push: { data_onboarding_template_assigned: { template_id: template._id, template_name: template_name, files: files_data, date_assigned: new Date()} } },
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
                res.status(200).json({
                    status: 200,
                    success: true,
                    data: result
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
export default dataOnboarding;
