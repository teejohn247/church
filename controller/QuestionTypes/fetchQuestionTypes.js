import QuestionTypes from '../../model/QuestionTypes';
import dotenv from 'dotenv';


dotenv.config();


const fetchQuestionTypes = async(req, res) => {
    try{
        const questionTypes = await QuestionTypes.find();

        if(!questionTypes){
            res.status(404).json({
                status:404,
                success: false,
                error:'No Question Type Found'
            })
            return
        }else{
            res.status(201).json({
                status: 201,
                success: true,
                data: questionTypes
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

export default fetchQuestionTypes;
