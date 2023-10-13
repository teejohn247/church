import Template from '../../model/DataOnboarding';
import dotenv from 'dotenv';


dotenv.config();


const listTemplates = async(req, res) => {
    try{

        const { page, limit } = req.query;

        const templates = await Template.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();


        const count = await Template.find().countDocuments()


        if(!templates){
            res.status(404).json({
                status:404,
                success: false,
                error:'No template Found'
            })
            return
        }else{
            res.status(200).json({
                status: 200,
                success: true,
                data: templates,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            })
        }
       
    }catch(err){
        res.status(500).json({
            status: 500,
            success: false,
            error: err
        })
    }
}

export default listTemplates;
