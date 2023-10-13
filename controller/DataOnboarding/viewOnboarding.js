
import dotenv from 'dotenv';
import Template from '../../model/DataOnboarding';
import bcrypt from 'bcrypt';



dotenv.config();


const viewOnboarding = async (req, res) => {

    try {

        let template = await Template.findOne({ _id: req.params.template_id });
        console.log(template)

        if (template.length < 1) {
            res.status(400).json({
                status: 400,
                error: 'Template does not exist'
            })
            return;
        }
        res.status(200).json({
            status: 200,
            success: true,
            data: template,
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default viewOnboarding;
