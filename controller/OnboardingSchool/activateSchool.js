import School from '../../model/School';
import dotenv from 'dotenv';


dotenv.config();


const activateSchool = async(req, res) => {
    try{
        const school = await School.find({_id: req.params.id});


        if (!school) {
            res.status(400).json({
                status: 400,
                error: 'school does not exist'
            })
            return;
        }
        if (school[0].enabled == true) {
            res.status(400).json({
                status: 400,
                error: 'school already activated'
            })
            return;
        }


        await school[0].update({
            activated: true
        }, school);


        res.status(201).json({
            status: 201,
            success: true,
            data: "school Enabled",
        })

       
    }catch(err){
        res.status(500).json({
            status: 500,
            success: false,
            error: err
        })
    }
}

export default activateSchool;
