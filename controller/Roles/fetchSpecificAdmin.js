import Admin from '../../model/Admin';
import dotenv from 'dotenv';


dotenv.config();


const fetchSpecificAdmin= async(req, res) => {
    try{
        const {id} = req.params
        const admin = await Admin.find({_id: id});

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
                data: admin
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

export default fetchSpecificAdmin;
