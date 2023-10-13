import School from '../../model/School';
import dotenv from 'dotenv';
import decrypt from '../../middleware/decrypt';



dotenv.config();


const listSchools = async(req, res) => {
    try{
        const { page, limit } = req.query;

        const schools = await School.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

        const count = await School.find().countDocuments();

        if(!schools){
            res.status(404).json({
                status:404,
                success: false,
                error:'No schools Found'
            })
            return
        }else{
            res.status(201).json({
                status: 201,
                success: true,
                data: schools,
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

export default listSchools;
