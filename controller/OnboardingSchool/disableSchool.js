import School from '../../model/School';
import dotenv from 'dotenv';


dotenv.config();


const disableSchool = async(req, res) => {
    try{
        const school = await School.find({_id: req.params.id});


        if (!school) {
            res.status(400).json({
                status: 400,
                error: 'school does not exist'
            })
            return;
        }



        if (school[0].activated == false) {
            res.status(400).json({
                status: 400,
                error: 'school already disabled'
            })
            return;
        }



        await school[0].updateOne({
            activated: false
        }, school);



        res.status(201).json({
            status: 201,
            success: true,
            data: "school Disabled",
        })

       
    }catch(err){
        res.status(500).json({
            status: 500,
            success: false,
            error: err
        })
    }
}

export default disableSchool;
