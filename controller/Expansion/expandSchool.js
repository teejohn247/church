import School from '../../model/School';
import dotenv from 'dotenv';


dotenv.config();


const expandSchool = async(req, res) => {
    try{

        const { addresses } = req.body;

        const school = await School.find({_id: req.params.id});

        if (!school) {
            res.status(400).json({
                status: 400,
                error: 'School does not exist'
            })
            return;
        }



        if (school[0].expansion !== true) {
            res.status(400).json({
                status: 400,
                error: 'Expansion has not been enabled for this school'
            })
            return;
        }

        let numberOfCampuses;

         School.findOneAndUpdate({ _id: req.params.id }, { $push: { addresses:  {  $each: addresses  } }} ,
             { upsert: true },
            function (
                err,
                result
            ) {

                if (err) {
                    res.status(401).json({
                        status: 401,
                        success: false,
                        error: err
                    })
                }
                else {

                    School.findOneAndUpdate({ _id: req.params.id }, {numberOfCampuses: result.addresses.length + addresses.length} ,
                        { upsert: true },
                       function (
                           err,
                           result
                       ) {
           
                           if (err) {
                               res.status(401).json({
                                   status: 401,
                                   success: false,
                                   error: err
                               })
                           }
                           res.status(200).json({
                            status: 200,
                            success: true,
                            data: "School Expanded Successfully"
                        })
           
                       })
                    

                }

            })

       
    }catch(err){
        res.status(500).json({
            status: 500,
            success: false,
            error: err
        })
    }
}

export default expandSchool;
