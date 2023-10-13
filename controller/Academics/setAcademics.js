
import dotenv from 'dotenv';
import School from '../../model/School';

dotenv.config();

const setAcademics = async (req, res) => {

    try {


        const {       
            create_academic_year,
            create_terms,
            create_nursery_classes,
            create_primary_classes,
            create_secondary_classes,
            schools
            } = req.body;



        let ids = [];


        schools.map((sch, index) => {
            ids.push(sch.id)
        })



        const school = await School.find({ _id: { $in : ids }});

        if (!school) {
            res.status(404).json({
                status: 404,
                error: 'One or more schools does not exist'
            })
            return
        }


        School.update({ _id: { $in : ids }}, {
                $set:
                {
                    "academics_settings.create_academic_year":  create_academic_year && create_academic_year,
                    "academics_settings.create_terms": create_terms && create_terms,
                    "academics_settings.create_primary_classes": create_primary_classes && create_primary_classes,
                    "academics_settings.create_secondary_classes": create_secondary_classes && create_secondary_classes,
                    "academics_settings.create_nursery_classes": create_nursery_classes && create_nursery_classes
                }
            
           },
           {multi: true},
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

            } else {

                res.status(200).json({
                     status: 200,
                     success: true,
                     data: result
                })
                   
        }
    })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default setAcademics;
