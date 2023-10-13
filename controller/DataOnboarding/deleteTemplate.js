import Template from '../../model/DataOnboarding';
import School from '../../model/School';

import dotenv from 'dotenv';


dotenv.config();


const deleteTemplate = async (req, res) => {
    try {
        const template = await Template.findOne({ _id: req.params.template_id });


        if (!template) {
            res.status(400).json({
                status: 400,
                error: 'Template does not exist'
            })
            return;
        }


        let ids = [];


        template.assigned_to.map((assign, index) => {
            ids.push(assign.school_id)
        })


        Template.remove({ _id: req.params.template_id },
            function (
                err,
                result
            ) {

                console.log(result)

                if (err) {
                    res.status(401).json({
                        status: 401,
                        success: false,
                        error: err
                    })
                }
                else {
                    School.update({_id: { $in : ids }}, { $pull: { "data_onboarding_template_assigned":{template_id: req.params.template_id }  } },
                        function (
                            err,
                            result
                        ) {

                            console.log(result)

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
                                    data: "Deleted successfully!"
                                })
                            }

                        })

                }

            })

    } catch (err) {
        res.status(500).json({
            status: 500,
            success: false,
            error: err
        })
    }
}

export default deleteTemplate;
