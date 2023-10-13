import dotenv from 'dotenv';
import Template from '../../model/DataOnboarding';
import School from '../../model/School';



dotenv.config();


const editOnboardingTemplate = async (req, res) => {

    try {

        const { template_id } = req.params;
        const { template_name } = req.body;


        const check = await Template.find({ _id: template_id })


        if (check.length < 1) {
            res.status(400).json({
                status: 400,
                error: 'Template does not exist'
            })
            return;
        }
        const checkTemp = await Template.find({ template_name: template_name })



        if (checkTemp.length > 0) {
            res.status(400).json({
                status: 400,
                error: 'Template name already exist'
            })
            return;
        }

        let ids = []
        console.log(check[0])

        console.log(check[0].assigned_to)


        check[0].assigned_to && check[0].assigned_to.map((assign, index) => {
            ids.push(assign.school_id)
        })

        if (check[0].assigned_to.length > 0) {
            console.log('ll')

            School.update({ _id: { $in: ids } },
                {
                    $set: {

                        "data_onboarding_template_assigned.$[i].template_name": template_name && template_name
                    }

                }, {
                arrayFilters: [
                    {
                        "i.template_id": template_id
                    }
                ]
            },
                function (
                    err,
                    result
                ) {
                    if (err) {
                        console.log(err)
                        res.status(401).json({
                            status: 401,
                            success: false,
                            error: err

                        })

                        return;

                    } else {


                     
                    }

                    
                })

                await check[0].update({

                    template_name: template_name && template_name

                });
                res.status(200).json({
                    status: 200,
                    success: true,
                    data: "Update Successful"
                })

        } else {
            console.log('lp')

          await check[0].update({

                template_name: template_name && template_name

            });
            res.status(200).json({
                status: 200,
                success: true,
                data: "Update Successful"
            })
        }



    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default editOnboardingTemplate;
