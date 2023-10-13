import Roles from '../../model/Roles';
import dotenv from 'dotenv';


dotenv.config();


const viewSingleRole = async(req, res) => {
    try{

        const roles = await Roles.find({_id: req.params.id})

        if(roles.length < 1){
            res.status(404).json({
                status:404,
                success: false,
                error:'No Role Found'
            })
            return
        }else{
            res.status(200).json({
                status: 200,
                success: true,
                data: roles
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

export default viewSingleRole;
