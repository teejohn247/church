import School from '../../model/School';
import dotenv from 'dotenv';


dotenv.config();


const totalNumberofSchools = async(req, res) => {
    try{
     

        const count = await School.find().countDocuments();


            res.status(200).json({
                status: 200,
                success: true,
                totalNumberofSchools: count,
               
            })
        
       
    }catch(err){
        res.status(500).json({
            status: 500,
            success: false,
            error: err
        })
    }
}

export default totalNumberofSchools;
