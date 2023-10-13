import Results from '../../model/Formulars';
import dotenv from 'dotenv';


dotenv.config();


const fetchFormulars = async(req, res) => {
    try{

        const results = await Results.find()

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

export default fetchFormulars;
