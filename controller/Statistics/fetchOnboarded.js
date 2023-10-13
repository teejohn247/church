import School from '../../model/School';
import dotenv from 'dotenv';


dotenv.config();


const fetchOnboareded = async(req, res) => {
    try{

        
        const count = await School.find({"onboarded": true}).countDocuments();


            res.status(200).json({
                status: 200,
                success: true,
                data: count,
            })
       
    }catch(err){
        res.status(500).json({
            status: 500,
            success: false,
            error: err
        })
    }
}

export default fetchOnboareded;
