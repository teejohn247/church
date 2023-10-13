import Template from '../../model/DataOnboarding';
import dotenv from 'dotenv';


dotenv.config();


const disableTemplate = async(req, res) => {
    try{
        const template = await Template.find({_id: req.params.id});


        if (!template) {
            res.status(400).json({
                status: 400,
                error: 'Template does not exist'
            })
            return;
        }



        if (template[0].enabled == false) {
            res.status(400).json({
                status: 400,
                error: 'Template already disabled'
            })
            return;
        }



        await template[0].updateOne({
            enabled: false
        }, template);



        res.status(201).json({
            status: 201,
            success: true,
            data: "Template Disabled",
        })

       
    }catch(err){
        res.status(500).json({
            status: 500,
            success: false,
            error: err
        })
    }
}

export default disableTemplate;
