import Calendly from '../../model/Calendly';
import dotenv from 'dotenv';


dotenv.config();


const fetchRequests = async(req, res) => {
    try{

        const { page, limit } = req.query;

        const calendly = await Calendly.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();


        const count = await Calendly.find().countDocuments()


        if(!calendly){
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
                data: calendly,
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

export default fetchRequests;
