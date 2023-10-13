import Results from '../../model/Results';
import dotenv from 'dotenv';


dotenv.config();


const fetchResults = async(req, res) => {
    try{
        const { page, limit } = req.query;

        const results = await Results.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();


        const count = await Results.find().countDocuments();


        if(!results){
            res.status(404).json({
                status:404,
                success: false,
                error:'No results Found'
            })
            return
        }else{
            res.status(201).json({
                status: 201,
                success: true,
                data: results,
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

export default fetchResults;
