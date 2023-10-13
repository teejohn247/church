
import dotenv from 'dotenv';
import QuestionTypes from '../../model/QuestionTypes';



dotenv.config();


const createQuestionTypes = async (req, res) => {

    try {



        const { field_title, input_type, options } = req.body;


        const check = await QuestionTypes.find({field_title: field_title})
    

        if (check.length > 0) {
            res.status(400).json({
                status: 400,
                error: 'Field Title already exists'
            })
            return;
        }


        let questionTypes = new QuestionTypes ({
            field_title,
            input_type,
            options
        })

        await questionTypes.save();

        res.status(200).json({
            status: 200,
            success: true,
            data: questionTypes
        })

       

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default createQuestionTypes;
