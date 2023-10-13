import Admin from '../../model/Admin'
import dotenv from 'dotenv';


dotenv.config();


const fetchAdmin = async(req, res) => {
    try{

        const { page, limit } = req.query;

        const admin = await Admin.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();


        const count = await Admin.find().countDocuments();


        if(!admin){
            res.status(404).json({
                status:404,
                success: false,
                error:'No admin Found'
            })
            return
        }else{
            res.status(201).json({
                status: 201,
                success: true,
                data: admin,
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

export default fetchAdmin;
