import School from '../../model/School';
import dotenv from 'dotenv';


dotenv.config();


const disableExpansion = async(req, res) => {
    try{
        const school = await School.find({_id: req.params.id});


        if (!school) {
            res.status(400).json({
                status: 400,
                error: 'School does not exist'
            })
            return;
        }


        if (school[0].expansion == false) {
            res.status(400).json({
                status: 400,
                error: 'Expansion for school already disabled'
            })
            return;
        }


        await school[0].updateOne({
            expansion: false
    }, school);

        res.status(200).json({
            status: 200,
            success: true,
            data: "Expansion Disabled",
        })

       
    }catch(err){
        res.status(500).json({
            status: 500,
            success: false,
            error: err
        })
    }
}

export default disableExpansion;
